// File: src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/create-trip', element: <CreateTrip /> },
  { path: '/view-trip/:tripId', element: <Viewtrip /> },
  { path: '/my-trips', element: <MyTrips /> },
])

// ✅ Load Google Maps JS script
const googleMapsScript = document.createElement('script')
googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`
googleMapsScript.async = true
googleMapsScript.defer = true
document.head.appendChild(googleMapsScript)

// ✅ Debug logs
console.log('GOOGLE_CLIENT_ID:', import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID)
console.log('GOOGLE_MAPS_API_KEY:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider options={{
      "client-id": "BAADAY77BzegnnwG_vphGq8M_5tu2VUzVQfE6Y4EGZKk7JznUTzCmlSChEHID8Ne_qOO-mfenXSSy9sACs",
      currency: "USD",
      components: "buttons"
    }}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <Header />
        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </PayPalScriptProvider>
  </React.StrictMode>
)
