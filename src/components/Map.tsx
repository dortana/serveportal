'use client';
import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
// @ts-ignore
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { cn } from '@/lib/utils';

interface MapProps {
  lat: number;
  lng: number;
  className?: string;
}
const Map = ({ lat, lng, className }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const zoom = 11;
  maptilersdk.config.apiKey = 'sWZUU069ENIk9mVhb6ME';

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current as unknown as string,
      style: maptilersdk.MapStyle.STREETS,
      center: [lng, lat],
      zoom: zoom,
    });

    const popup = new maptilersdk.Popup({
      offset: 25,
      closeButton: false,
    }).setText('RovixPro LLC');

    new maptilersdk.Marker({ color: '#08a6ec' })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map.current);
  }, [lng, lat, zoom]);

  return (
    <div className={cn('relative w-full h-96 rounded-lg z-0', className)}>
      <div ref={mapContainer} className='absolute w-full h-full  rounded-lg' />
    </div>
  );
};

export default Map;
