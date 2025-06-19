import { useParams } from 'react-router-dom';

export default function UpdateItem() {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Update Item</h1>
      <p>Item ID: {id}</p>
      <p>This page will contain a form to update the item details.</p>
    </div>
  );
}