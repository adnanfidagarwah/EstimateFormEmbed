import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected: (place: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  }) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  "data-testid"?: string;
}

interface PlacePrediction {
  description: string;
  place_id: string;
}

export function AddressAutocomplete({
  value,
  onChange,
  onPlaceSelected,
  placeholder,
  className,
  id,
  "data-testid": dataTestId,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchSuggestions = async (input: string) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(input)}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.predictions || []);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(newValue);
    }, 300);
  };

  const handleSelectPlace = async (placeId: string, description: string) => {
    setShowSuggestions(false);
    onChange(description);

    try {
      const response = await fetch(`/api/places/details?place_id=${encodeURIComponent(placeId)}`);
      if (response.ok) {
        const data = await response.json();
        
        if (data.result?.address_components) {
          let streetNumber = "";
          let route = "";
          let city = "";
          let state = "";
          let zipCode = "";

          data.result.address_components.forEach((component: any) => {
            const types = component.types;

            if (types.includes("street_number")) {
              streetNumber = component.long_name;
            }
            if (types.includes("route")) {
              route = component.long_name;
            }
            if (types.includes("locality")) {
              city = component.long_name;
            }
            if (types.includes("administrative_area_level_1")) {
              state = component.short_name;
            }
            if (types.includes("postal_code")) {
              zipCode = component.long_name;
            }
          });

          const streetAddress = `${streetNumber} ${route}`.trim();

          onPlaceSelected({
            streetAddress,
            city,
            state,
            zipCode,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        id={id}
        data-testid={dataTestId}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => handleSelectPlace(suggestion.place_id, suggestion.description)}
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      )}
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
}
