import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  // ✅ Check if the itinerary exists and is valid
  if (!trip?.tripData?.itinerary || !Array.isArray(trip.tripData.itinerary)) {
    return (
      <div className="text-white text-center mt-10 p-6">
        <h2 className="text-2xl font-bold mb-2">⚠️ Oops! Incomplete Info</h2>
        <p className="text-gray-300">
          Please complete all selections before generating your trip plan.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-lg text-white mb-4">Places to Visit</h2>

      <div>
        {trip.tripData.itinerary.map((item, index) => (
          <div key={index} className="mt-5">
            <h2 className="font-medium text-lg text-white">{item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item.plan.map((place, index) => (
                <div key={index}>
                  <h2 className="font-medium text-sm text-white">{place.time}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
