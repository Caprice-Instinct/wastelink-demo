import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import ListingCard from '../components/ListingCard';
import SearchFilterBar from '../components/SearchFilterBar';
import { Camera, Info, X, Heart, ShoppingCart as CartIcon, CreditCard, Star, MapPin, Package, Users } from 'lucide-react';

export default function Marketplace() {
  const router = useRouter();
  const { isGuest } = useAuth();
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Check for URL parameters on mount
  useEffect(() => {
    if (router.query.search) {
      setSearchQuery(router.query.search);
    }
    if (router.query.location) {
      setLocationFilter(router.query.location);
    }
  }, [router.query]);



  // Mock data
  const mockListings = [
    {
      _id: "2",
      title: "Cotton Textile Scraps - Mixed Colors",
      category: "textile",
      quantity: { amount: 800, unit: "kg" },
      quality: { grade: "B", contamination: 15 },
      location: { city: "Lagos", country: "Nigeria" },
      pricing: { askingPrice: 52000, currency: "KES", negotiable: true },
      images: ["/Textile_Scraps.jpg"],
      aiAnalysis: {
        confidence: 0.87,
        estimatedValue: { min: 350, max: 500 },
        marketDemand: "Medium",
      },
      seller: {
        name: "Adeyemi Textiles Ltd",
        rating: 4.5,
        totalSales: 156,
        verified: true,
        responseTime: "2 hours"
      },
    },
    {
      _id: "3",
      title: "E-Waste Components - Mixed Electronics",
      category: "electronics",
      quantity: { amount: 150, unit: "kg" },
      quality: { grade: "C", contamination: 25 },
      location: { city: "Nairobi", country: "Kenya" },
      pricing: { askingPrice: 26000, currency: "KES", negotiable: true },
      images: ["/E.png"],
      aiAnalysis: {
        confidence: 0.78,
        estimatedValue: { min: 180, max: 250 },
        marketDemand: "Low",
      },
    },
    {
      _id: "4",
      title: "Cardboard Boxes - Clean & Flat",
      category: "paper",
      quantity: { amount: 1.2, unit: "tonnes" },
      quality: { grade: "A", contamination: 2 },
      location: { city: "Cape Town", country: "South Africa" },
      pricing: { askingPrice: 39000, currency: "KES", negotiable: false },
      images: ["/cardbox.png"],
      aiAnalysis: {
        confidence: 0.96,
        estimatedValue: { min: 280, max: 350 },
        marketDemand: "High",
      },
    },
    {
      _id: "5",
      title: "Aluminum Scrap - Clean",
      category: "metal",
      quantity: { amount: 1.5, unit: "tonnes" },
      quality: { grade: "A", contamination: 1 },
      location: { city: "Mombasa", country: "Kenya" },
      pricing: { askingPrice: 286000, currency: "KES", negotiable: false },
      images: ["/aluminiums.png"],
      aiAnalysis: {
        confidence: 0.98,
        estimatedValue: { min: 2100, max: 2300 },
        marketDemand: "High",
      },
    },
    {
      _id: "6",
      title: "Glass Bottles - Mixed",
      category: "glass",
      quantity: { amount: 500, unit: "kg" },
      quality: { grade: "B", contamination: 10 },
      location: { city: "Thika", country: "Kenya" },
      pricing: { askingPrice: 19500, currency: "KES", negotiable: true },
      images: ["/glassbottles.png"],
      aiAnalysis: {
        confidence: 0.85,
        estimatedValue: { min: 120, max: 180 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "7",
      title: "Plastic Water Bottles - PET",
      category: "plastic",
      quantity: { amount: 800, unit: "kg" },
      quality: { grade: "A", contamination: 3 },
      location: { city: "Nairobi", country: "Kenya" },
      pricing: { askingPrice: 78000, currency: "KES", negotiable: true },
      images: ["/PET.png"],
      aiAnalysis: {
        confidence: 0.92,
        estimatedValue: { min: 550, max: 650 },
        marketDemand: "High",
      },
    },
    {
      _id: "8",
      title: "Copper Wire Scrap",
      category: "metal",
      quantity: { amount: 200, unit: "kg" },
      quality: { grade: "A", contamination: 2 },
      location: { city: "Eldoret", country: "Kenya" },
      pricing: { askingPrice: 234000, currency: "KES", negotiable: true },
      images: ["/copper.png"],
      aiAnalysis: {
        confidence: 0.96,
        estimatedValue: { min: 1700, max: 1900 },
        marketDemand: "High",
      },
    },
    {
      _id: "9",
      title: "Paper Waste - Office",
      category: "paper",
      quantity: { amount: 300, unit: "kg" },
      quality: { grade: "B", contamination: 8 },
      location: { city: "Nakuru", country: "Kenya" },
      pricing: { askingPrice: 11700, currency: "KES", negotiable: false },
      images: ["/paperwaste.png"],
      aiAnalysis: {
        confidence: 0.88,
        estimatedValue: { min: 80, max: 100 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "10",
      title: "Steel Cans - Food Grade",
      category: "metal",
      quantity: { amount: 400, unit: "kg" },
      quality: { grade: "A", contamination: 5 },
      location: { city: "Thika", country: "Kenya" },
      pricing: { askingPrice: 41600, currency: "KES", negotiable: true },
      images: ["/steelcans.png"],
      aiAnalysis: {
        confidence: 0.91,
        estimatedValue: { min: 300, max: 350 },
        marketDemand: "High",
      },
    },
    {
      _id: "11",
      title: "Plastic Bags - LDPE",
      category: "plastic",
      quantity: { amount: 600, unit: "kg" },
      quality: { grade: "C", contamination: 20 },
      location: { city: "Nairobi", country: "Kenya" },
      pricing: { askingPrice: 23400, currency: "KES", negotiable: true },
      images: ["/plasticbags.png"],
      aiAnalysis: {
        confidence: 0.75,
        estimatedValue: { min: 150, max: 200 },
        marketDemand: "Low",
      },
    },
    {
      _id: "12",
      title: "Electronic Components",
      category: "electronics",
      quantity: { amount: 100, unit: "kg" },
      quality: { grade: "B", contamination: 15 },
      location: { city: "Mombasa", country: "Kenya" },
      pricing: { askingPrice: 58500, currency: "KES", negotiable: false },
      images: ["/E.png"],
      aiAnalysis: {
        confidence: 0.82,
        estimatedValue: { min: 400, max: 500 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "13",
      title: "Cardboard Packaging",
      category: "paper",
      quantity: { amount: 2.1, unit: "tonnes" },
      quality: { grade: "A", contamination: 3 },
      location: { city: "Kisumu", country: "Kenya" },
      pricing: { askingPrice: 54600, currency: "KES", negotiable: true },
      images: ["/cardbox.png"],
      aiAnalysis: {
        confidence: 0.94,
        estimatedValue: { min: 400, max: 450 },
        marketDemand: "High",
      },
    },
    {
      _id: "14",
      title: "Textile Fabric Scraps",
      category: "textile",
      quantity: { amount: 250, unit: "kg" },
      quality: { grade: "B", contamination: 12 },
      location: { city: "Eldoret", country: "Kenya" },
      pricing: { askingPrice: 16250, currency: "KES", negotiable: true },
      images: ["/Textile_Scraps.jpg"],
      aiAnalysis: {
        confidence: 0.86,
        estimatedValue: { min: 100, max: 150 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "15",
      title: "Plastic Containers - PP",
      category: "plastic",
      quantity: { amount: 350, unit: "kg" },
      quality: { grade: "A", contamination: 4 },
      location: { city: "Nakuru", country: "Kenya" },
      pricing: { askingPrice: 36400, currency: "KES", negotiable: false },
      images: ["/container.png"],
      aiAnalysis: {
        confidence: 0.93,
        estimatedValue: { min: 260, max: 300 },
        marketDemand: "High",
      },
    },
    {
      _id: "16",
      title: "Iron Scrap - Mixed",
      category: "metal",
      quantity: { amount: 800, unit: "kg" },
      quality: { grade: "B", contamination: 18 },
      location: { city: "Nairobi", country: "Kenya" },
      pricing: { askingPrice: 31200, currency: "KES", negotiable: true },
      images: ["/iron.png"],
      aiAnalysis: {
        confidence: 0.79,
        estimatedValue: { min: 200, max: 280 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "17",
      title: "Newspaper Bundles",
      category: "paper",
      quantity: { amount: 150, unit: "kg" },
      quality: { grade: "B", contamination: 10 },
      location: { city: "Mombasa", country: "Kenya" },
      pricing: { askingPrice: 5850, currency: "KES", negotiable: true },
      images: ["/newspaper.png"],
      aiAnalysis: {
        confidence: 0.87,
        estimatedValue: { min: 40, max: 50 },
        marketDemand: "Low",
      },
    },
    {
      _id: "18",
      title: "Plastic Film Rolls",
      category: "plastic",
      quantity: { amount: 450, unit: "kg" },
      quality: { grade: "B", contamination: 15 },
      location: { city: "Kisumu", country: "Kenya" },
      pricing: { askingPrice: 29250, currency: "KES", negotiable: false },
      images: ["/wrap.png"],
      aiAnalysis: {
        confidence: 0.84,
        estimatedValue: { min: 200, max: 250 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "19",
      title: "Brass Fittings",
      category: "metal",
      quantity: { amount: 75, unit: "kg" },
      quality: { grade: "A", contamination: 2 },
      location: { city: "Eldoret", country: "Kenya" },
      pricing: { askingPrice: 58500, currency: "KES", negotiable: true },
      images: ["/brass.png"],
      aiAnalysis: {
        confidence: 0.95,
        estimatedValue: { min: 420, max: 480 },
        marketDemand: "High",
      },
    },
    {
      _id: "20",
      title: "Cotton Rags",
      category: "textile",
      quantity: { amount: 180, unit: "kg" },
      quality: { grade: "C", contamination: 25 },
      location: { city: "Nakuru", country: "Kenya" },
      pricing: { askingPrice: 7020, currency: "KES", negotiable: true },
      images: ["/cottonrag.png"],
      aiAnalysis: {
        confidence: 0.72,
        estimatedValue: { min: 45, max: 65 },
        marketDemand: "Low",
      },
    },
  ];

  useEffect(() => {
    // Load mock listings
    let allListings = [...mockListings];

    // Check if user has created a listing
    const userListing = localStorage.getItem('userListing');
    if (userListing) {
      const parsedListing = JSON.parse(userListing);
      // Add user's listing at the beginning
      allListings = [parsedListing, ...allListings];
    }

    setListings(allListings);
  }, []);

  const filteredListings = listings.filter(
    (listing) =>
      (locationFilter === "all" || listing.location?.country === locationFilter) &&
      (searchQuery === "" ||
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const makeOffer = (listingId, message, proposedPrice) => {
    alert("Offer sent successfully! (Demo mode)");
  };

  const handleViewProduct = (listing) => {
    // Add default seller if not present
    const productWithSeller = {
      ...listing,
      seller: listing.seller || {
        name: "WasteLink Verified Seller",
        rating: 4.2,
        totalSales: 89,
        verified: true,
        responseTime: "3 hours"
      }
    };
    setSelectedProduct(productWithSeller);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleToggleWishlist = (productId) => {
    const isInWishlist = wishlist.includes(productId);
    if (isInWishlist) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToastMessage('Removed from wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      showToastMessage('Added to wishlist');
    }
  };

  const handleAddToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cartItem') || '[]');
    const cartArray = Array.isArray(existingCart) ? existingCart : [existingCart];

    // Add new item
    cartArray.push(product);
    localStorage.setItem('cartItem', JSON.stringify(cartArray));

    showToastMessage('Added to cart');
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Guest Mode Banner */}
        {isGuest && (
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm md:text-base font-medium">
                <strong>Guest Mode:</strong> You can browse all listings, but you'll need to sign in to add items to the marketplace or create your own listings.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Circular Marketplace
            </h2>
            <p className="text-gray-600">
              Live waste-to-resource trading across Africa
            </p>
          </div>

          <SearchFilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search materials..."
            filterValue={locationFilter}
            onFilterChange={setLocationFilter}
            filterOptions={[
              { value: 'all', label: 'All Locations' },
              { value: 'Ghana', label: 'Ghana' },
              { value: 'Nigeria', label: 'Nigeria' },
              { value: 'Kenya', label: 'Kenya' },
              { value: 'South Africa', label: 'South Africa' }
            ]}
          />
        </div>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-3 sm:p-4 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            <div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold">2,847</div>
              <div className="text-xs sm:text-sm opacity-90">Active Listings</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold">$4.2M</div>
              <div className="text-xs sm:text-sm opacity-90">Daily Volume</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold">156</div>
              <div className="text-xs sm:text-sm opacity-90">Transactions Today</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold">23%↑</div>
              <div className="text-xs sm:text-sm opacity-90">HDPE Demand</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} onViewClick={handleViewProduct} />
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No listings found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {showModal && selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Gradient */}
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between z-10 shadow-lg">
              <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="hidden sm:inline">Product Details</span>
                <span className="sm:hidden">Details</span>
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all text-white flex-shrink-0"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
              <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8">
                {/* Product Image with Enhanced Styling */}
                <div className="relative group">
                  {selectedProduct.images && selectedProduct.images.length > 0 ? (
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.title}
                      className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-2xl shadow-lg"
                    style={{
                      display: selectedProduct.images && selectedProduct.images.length > 0 ? "none" : "flex",
                    }}
                  >
                    <Camera className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-400" />
                  </div>
                  <div className="absolute top-2 sm:top-3 md:top-5 left-2 sm:left-3 md:left-5 bg-gradient-to-r from-green-500 to-green-600 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow-lg">
                    Grade {selectedProduct.quality?.grade || "B"}
                  </div>
                  {selectedProduct.aiAnalysis?.confidence && (
                    <div className="absolute top-2 sm:top-3 md:top-5 right-2 sm:right-3 md:right-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow-lg">
                      {Math.round(selectedProduct.aiAnalysis.confidence * 100)}% AI
                    </div>
                  )}
                </div>

                {/* Product Title & Price with Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 rounded-2xl border-2 border-gray-100 shadow-sm">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{selectedProduct.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500 mb-1 font-medium">Asking Price</div>
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                        KSh{selectedProduct.pricing?.askingPrice?.toLocaleString() || "0"}
                      </div>
                    </div>
                    {selectedProduct.aiAnalysis?.estimatedValue && (
                      <div className="sm:text-right bg-blue-50 px-3 sm:px-4 py-2 rounded-lg">
                        <div className="text-xs text-blue-600 font-semibold mb-1">AI Estimated Value</div>
                        <div className="text-base sm:text-lg font-bold text-blue-700">
                          ${selectedProduct.aiAnalysis.estimatedValue.min}-${selectedProduct.aiAnalysis.estimatedValue.max}
                        </div>
                      </div>
                    )}
                  </div>
                  {selectedProduct.pricing?.negotiable && (
                    <div className="mt-3 inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                      Price Negotiable
                    </div>
                  )}
                </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-5 md:p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center text-blue-700 mb-2">
                    <div className="p-1.5 sm:p-2 bg-blue-200 rounded-lg mr-2 sm:mr-3">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">Quantity</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-900">
                    {selectedProduct.quantity.amount} {selectedProduct.quantity.unit}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-5 md:p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center text-purple-700 mb-2">
                    <div className="p-1.5 sm:p-2 bg-purple-200 rounded-lg mr-2 sm:mr-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">Location</span>
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-900">
                    {selectedProduct.location?.city}, {selectedProduct.location?.country}
                  </div>
                </div>

                <div className={`p-4 sm:p-5 md:p-6 rounded-xl border-2 hover:shadow-lg transition-shadow ${
                  selectedProduct.aiAnalysis?.marketDemand === "High"
                    ? "bg-gradient-to-br from-green-50 to-green-100 border-green-200"
                    : selectedProduct.aiAnalysis?.marketDemand === "Medium"
                    ? "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200"
                    : "bg-gradient-to-br from-red-50 to-red-100 border-red-200"
                }`}>
                  <div className={`text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 ${
                    selectedProduct.aiAnalysis?.marketDemand === "High" ? "text-green-700" :
                    selectedProduct.aiAnalysis?.marketDemand === "Medium" ? "text-yellow-700" :
                    "text-red-700"
                  }`}>Market Demand</div>
                  <div className={`text-2xl sm:text-3xl font-bold ${
                    selectedProduct.aiAnalysis?.marketDemand === "High" ? "text-green-900" :
                    selectedProduct.aiAnalysis?.marketDemand === "Medium" ? "text-yellow-900" :
                    "text-red-900"
                  }`}>
                    {selectedProduct.aiAnalysis?.marketDemand || "Medium"}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-5 md:p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-orange-700 mb-2">Contamination Level</div>
                  <div className="text-2xl sm:text-3xl font-bold text-orange-900">
                    {selectedProduct.quality?.contamination || 0}%
                  </div>
                  <div className="mt-2 w-full bg-orange-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all"
                      style={{width: `${Math.min(selectedProduct.quality?.contamination || 0, 100)}%`}}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Seller Information */}
              <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4 sm:p-6 md:p-8 rounded-2xl border-2 border-indigo-200 shadow-md">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Seller Information</h4>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-md flex-shrink-0">
                          {selectedProduct.seller.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">{selectedProduct.seller.name}</span>
                            {selectedProduct.seller.verified && (
                              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold shadow-sm flex items-center gap-1 flex-shrink-0">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                  i < Math.floor(selectedProduct.seller.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                            <span className="text-xs sm:text-sm font-bold text-gray-700 ml-1">
                              {selectedProduct.seller.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-lg border border-green-200">
                          <div className="text-xs text-green-700 font-semibold uppercase mb-1">Total Sales</div>
                          <div className="text-xl sm:text-2xl font-bold text-green-900">{selectedProduct.seller.totalSales}</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg border border-blue-200">
                          <div className="text-xs text-blue-700 font-semibold uppercase mb-1">Response Time</div>
                          <div className="text-base sm:text-lg font-bold text-blue-900">{selectedProduct.seller.responseTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 rounded-2xl space-y-4">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Quick Actions</h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <button
                    onClick={() => handleToggleWishlist(selectedProduct._id)}
                    className={`group py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold transition-all transform hover:scale-105 flex flex-col items-center justify-center gap-2 sm:gap-3 shadow-md ${
                      wishlist.includes(selectedProduct._id)
                        ? "bg-gradient-to-br from-red-500 to-pink-600 text-white border-2 border-red-600"
                        : "bg-white border-2 border-gray-300 text-gray-700 hover:border-red-500"
                    }`}
                  >
                    <Heart
                      className={`w-6 h-6 sm:w-8 sm:h-8 transition-all ${
                        wishlist.includes(selectedProduct._id)
                          ? "fill-white"
                          : "group-hover:fill-red-500 group-hover:text-red-500"
                      }`}
                    />
                    <span className="text-xs sm:text-sm">
                      {wishlist.includes(selectedProduct._id) ? "In Wishlist" : "Add to Wishlist"}
                    </span>
                  </button>

                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="group bg-gradient-to-br from-blue-500 to-blue-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold hover:from-blue-600 hover:to-blue-800 transition-all transform hover:scale-105 flex flex-col items-center justify-center gap-2 sm:gap-3 shadow-lg border-2 border-blue-600"
                  >
                    <CartIcon className="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm">Add to Cart</span>
                  </button>

                  <button
                    disabled={isGuest}
                    className={`group py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold transition-all transform flex flex-col items-center justify-center gap-2 sm:gap-3 shadow-lg border-2 ${
                      isGuest
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300"
                        : "bg-gradient-to-br from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800 hover:scale-105 border-green-600"
                    }`}
                    title={isGuest ? "Sign in to purchase" : ""}
                  >
                    <CreditCard className={`w-6 h-6 sm:w-8 sm:h-8 ${!isGuest && "group-hover:scale-110 transition-transform"}`} />
                    <span className="text-xs sm:text-sm">Purchase Now</span>
                  </button>
                </div>
              </div>

              {isGuest && (
                <div className="bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-300 text-orange-900 p-4 sm:p-5 rounded-xl shadow-sm">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-orange-200 rounded-lg flex-shrink-0">
                      <Info className="w-4 h-4 sm:w-5 sm:h-5 text-orange-700" />
                    </div>
                    <div className="min-w-0">
                      <strong className="text-base sm:text-lg">Guest Mode Active</strong>
                      <p className="text-xs sm:text-sm mt-1">You're browsing as a guest. Sign in to unlock purchasing and full marketplace features.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl z-50 animate-slide-up border border-gray-700 flex items-center gap-2 sm:gap-3 max-w-[calc(100vw-2rem)]">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
          <span className="font-semibold text-sm sm:text-base md:text-lg truncate">{toastMessage}</span>
        </div>
      )}
    </Layout>
  );
}