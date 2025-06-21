import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, MapPin, User, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface RecoveredItem {
  id: string;
  item_id: string;
  recovered_by_user_id: string;
  recovered_person_name: string;
  recovered_person_email: string;
  recovery_date: string;
  recovered_location: string;
  recovered_person_image?: string;
  created_at: string;
  items: {
    title: string;
    description: string;
    post_type: 'Lost' | 'Found';
    category: string;
    location: string;
    date_lost_found: string;
  };
}

export default function AllRecovered() {
  const [recoveredItems, setRecoveredItems] = useState<RecoveredItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "WhereIsIt - All Recovered Items";
    fetchRecoveredItems();
  }, []);

  const fetchRecoveredItems = async () => {
    try {
      const { data, error } = await supabase
        .from('recovered_items')
        .select(`
          *,
          items (
            title,
            description,
            post_type,
            category,
            location,
            date_lost_found
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecoveredItems(data || []);
    } catch (error) {
      console.error('Error fetching recovered items:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            All Recovered Items
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Celebrate the success stories! These items have been successfully reunited with their owners.
          </p>
        </motion.div>

        {/* Recovered Items Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : recoveredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No recovered items yet</h3>
            <p className="text-muted-foreground">
              Recovery stories will appear here once items are successfully reunited with their owners.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {recoveredItems.map((recovery, index) => (
              <motion.div
                key={recovery.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        {recovery.items.title}
                      </CardTitle>
                      <Badge variant={recovery.items.post_type === 'Lost' ? 'destructive' : 'default'}>
                        {recovery.items.post_type}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {recovery.items.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        Original: {recovery.items.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        Recovered: {recovery.recovered_location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        Recovered: {format(new Date(recovery.recovery_date), 'MMM d, yyyy')}
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-green-500" />
                        <div>
                          <p className="font-medium">Recovered by</p>
                          <p className="text-muted-foreground">{recovery.recovered_person_name}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Results Count */}
        {!loading && recoveredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8 text-muted-foreground"
          >
            {recoveredItems.length} successful recoveries
          </motion.div>
        )}
      </div>
    </div>
  );
}