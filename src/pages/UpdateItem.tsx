import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const categories = [
  'pets',
  'documents', 
  'gadgets',
  'clothing',
  'jewelry',
  'keys',
  'bags',
  'other'
];

interface Item {
  id: string;
  title: string;
  description: string;
  post_type: 'Lost' | 'Found';
  category: string;
  location: string;
  date_lost_found: string;
  contact_name: string;
  contact_email: string;
  thumbnail_url?: string;
  user_id: string;
}

export default function UpdateItem() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    postType: '',
    category: '',
    location: '',
    dateLostFound: '',
    contactName: '',
    contactEmail: '',
    thumbnailUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && user) {
      fetchItem();
    }
  }, [id, user]);

  const fetchItem = async () => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Item not found or you do not have permission to edit it');
        } else {
          throw error;
        }
        return;
      }

      setItem(data);
      setFormData({
        title: data.title,
        description: data.description,
        postType: data.post_type,
        category: data.category,
        location: data.location,
        dateLostFound: data.date_lost_found,
        contactName: data.contact_name,
        contactEmail: data.contact_email,
        thumbnailUrl: data.thumbnail_url || ''
      });
      
      document.title = `WhereIsIt - Edit ${data.title}`;
    } catch (error) {
      console.error('Error fetching item:', error);
      setError('Failed to load item details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedImage || !user) return null;

    const fileExt = selectedImage.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('item-images')
      .upload(fileName, selectedImage);

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('item-images')
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !item) return;

    setIsSubmitting(true);
    
    try {
      // Upload image if selected
      let imageUrl = formData.thumbnailUrl;
      if (selectedImage) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const { error } = await supabase
        .from('items')
        .update({
          title: formData.title,
          description: formData.description,
          post_type: formData.postType as 'Lost' | 'Found',
          category: formData.category as any,
          location: formData.location,
          date_lost_found: formData.dateLostFound,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          thumbnail_url: imageUrl || null,
        })
        .eq('id', item.id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your item has been updated successfully."
      });

      navigate('/myItems');
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        title: "Error",
        description: "Failed to update item. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              You need to be signed in to edit items.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || 'Item not found'}
          </h1>
          <p className="text-muted-foreground mb-6">
            The item you're trying to edit doesn't exist or you don't have permission.
          </p>
          <Button onClick={() => navigate('/myItems')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Items
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/myItems')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Items
          </Button>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Update Item
            </h1>
            <p className="text-muted-foreground text-lg">
              Make changes to your item details to help others identify it better.
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Item Details</CardTitle>
              <CardDescription>
                Update any information that has changed or needs clarification.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Post Type */}
                <div className="space-y-2">
                  <Label htmlFor="postType">Type *</Label>
                  <Select 
                    value={formData.postType} 
                    onValueChange={(value) => handleInputChange('postType', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select if item is lost or found" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lost">Lost - I lost this item</SelectItem>
                      <SelectItem value="Found">Found - I found this item</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title *</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="e.g., Black iPhone 15 Pro"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed description including colors, brands, distinguishing features..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange('category', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select item category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., Central Park, NYC or University Library"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="dateLostFound">
                    Date {formData.postType === 'Lost' ? 'Lost' : formData.postType === 'Found' ? 'Found' : 'Lost/Found'} *
                  </Label>
                  <Input
                    id="dateLostFound"
                    type="date"
                    value={formData.dateLostFound}
                    onChange={(e) => handleInputChange('dateLostFound', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Your Name *</Label>
                    <Input
                      id="contactName"
                      type="text"
                      placeholder="Full name"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="imageUpload">Upload New Photo (Optional)</Label>
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  {item?.thumbnail_url && !imagePreview && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Current image:</p>
                      <img
                        src={item.thumbnail_url}
                        alt="Current"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Upload a new photo to replace the current one.
                  </p>
                </div>

                {/* Photo URL */}
                <div className="space-y-2">
                  <Label htmlFor="thumbnailUrl">Or Photo URL (Optional)</Label>
                  <Input
                    id="thumbnailUrl"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.thumbnailUrl}
                    onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Alternatively, add a photo URL if you have one online.
                  </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate('/myItems')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Updating...' : 'Update Item'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}