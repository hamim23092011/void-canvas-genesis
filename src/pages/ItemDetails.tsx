import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, User, Mail, Tag, ArrowLeft, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

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
  is_recovered: boolean;
  created_at: string;
  user_id: string;
}

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Item not found');
        } else {
          throw error;
        }
        return;
      }

      setItem(data);
      document.title = `WhereIsIt - ${data.title}`;
    } catch (error) {
      console.error('Error fetching item:', error);
      setError('Failed to load item details');
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to contact the item owner.",
        variant: "destructive"
      });
      return;
    }

    if (item?.contact_email) {
      const subject = `Regarding your ${item.post_type.toLowerCase()} item: ${item.title}`;
      const body = `Hi ${item.contact_name},\n\nI saw your post about the ${item.post_type.toLowerCase()} ${item.title}. I might have information that could help.\n\nBest regards`;
      window.open(`mailto:${item.contact_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-64 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-24" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              </div>
            </div>
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
            The item you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/allItems">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Items
            </Button>
          </Link>
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
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Link to="/allItems" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Items
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-2xl md:text-3xl mb-2">
                        {item.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant={item.post_type === 'Lost' ? 'destructive' : 'default'} className="text-sm">
                          {item.post_type}
                        </Badge>
                        {item.is_recovered && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Recovered
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {item.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {format(new Date(item.date_lost_found), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2" />
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Image */}
                  {item.thumbnail_url && (
                    <div className="mb-6">
                      <img 
                        src={item.thumbnail_url} 
                        alt={item.title}
                        className="w-full h-64 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {item.description}
                    </p>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Additional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Posted:</span>{' '}
                      <span className="text-muted-foreground">
                        {format(new Date(item.created_at), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>{' '}
                      <span className={`${item.is_recovered ? 'text-green-600' : 'text-blue-600'}`}>
                        {item.is_recovered ? 'Recovered' : 'Active'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                  <CardDescription>
                    Get in touch with the person who {item.post_type === 'Lost' ? 'lost' : 'found'} this item.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="font-medium">{item.contact_name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{item.contact_email}</span>
                    </div>
                  </div>
                  
                  {!item.is_recovered && (
                    <Button 
                      onClick={handleContactClick}
                      className="w-full"
                      disabled={user?.id === item.user_id}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {user?.id === item.user_id ? 'This is your item' : 'Contact Owner'}
                    </Button>
                  )}
                  
                  {item.is_recovered && (
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <p className="text-green-700 dark:text-green-400 font-medium">
                        This item has been recovered!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Safety Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Safety Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Meet in a public place</li>
                    <li>• Bring a friend if possible</li>
                    <li>• Verify item details before meeting</li>
                    <li>• Trust your instincts</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}