import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import SearchFilterBar from '../components/SearchFilterBar';
import StatusBadge from '../components/StatusBadge';
import MetricCard from '../components/MetricCard';
import { Search, Plus, Eye, DollarSign, Users, Lock, ShoppingBag } from 'lucide-react';

export default function Listings() {
  const router = useRouter();
  const { isGuest } = useAuth();
  const [myListingsSearch, setMyListingsSearch] = useState('');
  const [myListingsStatusFilter, setMyListingsStatusFilter] = useState('all');

  const myListingsData = [
    {
      _id: "ml1",
      title: "Aluminum Cans - Food Grade",
      category: "metal",
      quantity: { amount: 500, unit: "kg" },
      status: "active",
      dateCreated: "2024-01-15",
      views: 45,
      offers: 3,
      pricing: { askingPrice: 104000, currency: "KES" },
      client: null,
    },
    {
      _id: "ml2",
      title: "Glass Bottles - Mixed Colors",
      category: "glass",
      quantity: { amount: 200, unit: "kg" },
      status: "sold",
      dateCreated: "2024-01-10",
      soldPrice: 19500,
      soldDate: "2024-01-18",
      pricing: { askingPrice: 23400, currency: "KES" },
      client: "EcoGlass Kenya Ltd",
    },
    {
      _id: "ml3",
      title: "HDPE Plastic Containers",
      category: "plastic",
      quantity: { amount: 300, unit: "kg" },
      status: "payment_pending",
      dateCreated: "2024-01-20",
      views: 28,
      offers: 1,
      pricing: { askingPrice: 39000, currency: "KES" },
      client: "Plastix Recyclers",
    },
    {
      _id: "ml4",
      title: "Cardboard Boxes - Clean",
      category: "paper",
      quantity: { amount: 1.2, unit: "tonnes" },
      status: "sold",
      dateCreated: "2024-01-05",
      soldPrice: 31200,
      soldDate: "2024-01-12",
      pricing: { askingPrice: 35000, currency: "KES" },
      client: "Paper Mills East Africa",
    },
    {
      _id: "ml5",
      title: "Electronic Components - Mixed",
      category: "electronics",
      quantity: { amount: 80, unit: "kg" },
      status: "active",
      dateCreated: "2024-01-22",
      views: 67,
      offers: 5,
      pricing: { askingPrice: 52000, currency: "KES" },
      client: null,
    },
    {
      _id: "ml6",
      title: "Copper Wire Scrap",
      category: "metal",
      quantity: { amount: 150, unit: "kg" },
      status: "payment_pending",
      dateCreated: "2024-01-18",
      views: 89,
      offers: 7,
      pricing: { askingPrice: 175500, currency: "KES" },
      client: "MetalCorp Industries",
    },
    {
      _id: "ml7",
      title: "Textile Fabric Scraps - Cotton",
      category: "textile",
      quantity: { amount: 250, unit: "kg" },
      status: "expired",
      dateCreated: "2023-12-15",
      views: 23,
      offers: 0,
      pricing: { askingPrice: 16250, currency: "KES" },
      client: null,
    },
  ];

  const filteredListings = myListingsData.filter((listing) => {
    const matchesSearch = myListingsSearch === "" || 
      listing.title.toLowerCase().includes(myListingsSearch.toLowerCase()) ||
      listing.category.toLowerCase().includes(myListingsSearch.toLowerCase()) ||
      (listing.client && listing.client.toLowerCase().includes(myListingsSearch.toLowerCase()));
    
    const matchesStatus = myListingsStatusFilter === "all" || listing.status === myListingsStatusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const activeCount = myListingsData.filter(l => l.status === "active").length;
  const totalRevenue = myListingsData.filter(l => l.status === "sold").reduce((sum, l) => sum + (l.soldPrice || 0), 0);
  const totalViews = myListingsData.reduce((sum, l) => sum + (l.views || 0), 0);

  // If guest, show restricted access message
  if (isGuest) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Listings Not Available in Guest Mode
            </h2>
            <p className="text-gray-600 mb-6">
              You can only browse the marketplace as a guest. Creating and managing listings requires signing in.
            </p>
            <Link
              href="/marketplace"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Browse Marketplace</span>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">My Listings</h2>
            <p className="text-gray-600">Manage your waste listings and sales</p>
          </div>
          <Link
            href="/scanner"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Listing</span>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <SearchFilterBar
            searchValue={myListingsSearch}
            onSearchChange={setMyListingsSearch}
            searchPlaceholder="Search by name, material, or client..."
            filterValue={myListingsStatusFilter}
            onFilterChange={setMyListingsStatusFilter}
            filterOptions={[
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'sold', label: 'Sold' },
              { value: 'payment_pending', label: 'Payment Pending' },
              { value: 'expired', label: 'Expired' }
            ]}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Active Listings
            </h3>
            <div className="text-3xl font-bold text-green-600">{activeCount}</div>
            <p className="text-sm text-green-700">Currently listed</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Total Sales
            </h3>
            <div className="text-3xl font-bold text-blue-600">KSh{totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-blue-700">Revenue earned</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              Total Views
            </h3>
            <div className="text-3xl font-bold text-purple-600">{totalViews}</div>
            <p className="text-sm text-purple-700">Listing views</p>
          </div>
        </div>

        {/* Listings */}
        <div className="bg-white rounded-xl shadow-lg border">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold text-gray-900">Your Listings ({filteredListings.length})</h3>
          </div>
          <div className="divide-y">
            {filteredListings.map((listing) => (
              <div key={listing._id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {listing.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {listing.quantity.amount} {listing.quantity.unit} • Created {listing.dateCreated}
                    </p>
                    {listing.client && (
                      <p className="text-sm text-blue-600 mt-1">
                        Client: {listing.client}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        Views: {listing.views || 0}
                      </span>
                      <span className="text-sm text-gray-500">
                        Offers: {listing.offers || 0}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      KSh{(listing.status === "sold"
                        ? listing.soldPrice
                        : listing.pricing.askingPrice).toLocaleString()}
                    </div>
                    <StatusBadge status={listing.status} />
                    {listing.status === "sold" && listing.soldDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Completed on {listing.soldDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No listings found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}