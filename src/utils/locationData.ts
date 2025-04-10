
// South African provinces and their main cities
export const southAfricanProvinces = [
  {
    name: "Eastern Cape",
    cities: ["East London", "Port Elizabeth", "Mthatha", "Grahamstown"]
  },
  {
    name: "Free State",
    cities: ["Bloemfontein", "Welkom", "Bethlehem", "Sasolburg"]
  },
  {
    name: "Gauteng",
    cities: ["Johannesburg", "Pretoria", "Soweto", "Centurion"]
  },
  {
    name: "KwaZulu-Natal",
    cities: ["Durban", "Pietermaritzburg", "Newcastle", "Richards Bay"]
  },
  {
    name: "Limpopo",
    cities: ["Polokwane", "Tzaneen", "Musina", "Bela Bela"]
  },
  {
    name: "Mpumalanga",
    cities: ["Nelspruit", "Witbank", "Secunda", "Barberton"]
  },
  {
    name: "Northern Cape",
    cities: ["Kimberley", "Upington", "Kuruman", "De Aar"]
  },
  {
    name: "North West",
    cities: ["Rustenburg", "Potchefstroom", "Mahikeng", "Klerksdorp"]
  },
  {
    name: "Western Cape",
    cities: ["Cape Town", "Stellenbosch", "George", "Paarl"]
  }
];

// Helper function to get cities for a given province
export const getCitiesForProvince = (province: string | null | undefined): string[] => {
  if (!province) return [];
  
  const provinceData = southAfricanProvinces.find(p => p.name === province);
  return provinceData ? provinceData.cities : [];
};
