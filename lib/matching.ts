import type {
  AvailabilityState,
  NeedTag,
  Offer,
  OfferCategory,
} from "@/types/site";

export const categoryFilters: Array<"Alle" | OfferCategory> = [
  "Alle",
  "Arbeit",
  "Wohnen",
  "Tagesstruktur",
  "Beratung",
];

export const needFilters: Array<"Alle" | NeedTag> = [
  "Alle",
  "Autismus",
  "Hoher Unterstützungsbedarf",
  "Mobilität",
  "Junge Erwachsene",
  "Übergang Schule-Beruf",
];

const availabilityPriority: Record<AvailabilityState, number> = {
  "Freie Kapazität": 0,
  "Profil passend": 1,
  Warteliste: 2,
};

export function getMatchedOffers(
  offers: Offer[],
  category: "Alle" | OfferCategory,
  need: "Alle" | NeedTag,
) {
  return [...offers]
    .filter((offer) => (category === "Alle" ? true : offer.category === category))
    .filter((offer) => (need === "Alle" ? true : offer.tags.includes(need)))
    .sort((a, b) => {
      const availabilityDifference =
        availabilityPriority[a.availability] - availabilityPriority[b.availability];

      if (availabilityDifference !== 0) {
        return availabilityDifference;
      }

      return a.distanceKm - b.distanceKm;
    });
}
