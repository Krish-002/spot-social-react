// Define an interface for the Album which will include album_name and images
export interface Album {
    album_name: string;
    images: Array<{ url: string }>; // Array of images associated with the album
  }
  
  // Modify the TrackItem interface to use the new Album interface
  export interface TrackItem {
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: Album;  // Use the Album interface here
    external_urls: { spotify: string };
  }
  