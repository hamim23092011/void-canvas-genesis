import { useParams } from 'react-router-dom';

export default function ItemDetails() {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Item Details</h1>
      <p>Item ID: {id}</p>
      <p>This page will show detailed information about the item.</p>
    </div>
  );
}