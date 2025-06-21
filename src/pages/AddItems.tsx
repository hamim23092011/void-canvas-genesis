import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

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

export default function AddItems() {
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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

    try {
      const fileExt = selectedImage.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('item-images')
        .upload(fileName, selectedImage);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('item-images')
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      let imageUrl = formData.thumbnailUrl;
      
      // Upload image if selected
      if (selectedImage) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const { data, error } = await supabase
        .from('items')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            post_type: formData.postType as 'Lost' | 'Found',
            category: formData.category as any,
            location: formData.location,
            date_lost_found: formData.dateLostFound,
            contact_name: formData.contactName,
            contact_email: formData.contactEmail,
            thumbnail_url: imageUrl || null,
            user_id: user.id,
            is_recovered: false
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your item has been posted successfully."
      });

      navigate('/myItems');
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
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
              You need to be signed in to report lost or found items.
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Report Lost or Found Item
            </h1>
            <p className="text-muted-foreground text-lg">
              Help reunite items with their owners by providing detailed information.
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>
                Fill out all the required information to help others identify the item.
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
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="imageUpload">Upload Photo (Recommended)</Label>
                    <Input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload a photo to help others identify the item better.
                    </p>
                  </div>
                  
                  {imagePreview && (
                    <div className="space-y-2">
                      <Label>Image Preview</Label>
                      <div className="relative w-full h-48 border border-border rounded-lg overflow-hidden">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="thumbnailUrl">Or Photo URL</Label>
                    <Input
                      id="thumbnailUrl"
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={formData.thumbnailUrl}
                      onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Alternatively, provide a photo URL if you prefer.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Item'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}