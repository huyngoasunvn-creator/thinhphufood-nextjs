import { useState, useEffect } from "react";

export const useVietnamAddress = () => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);

  /* LOAD PROVINCES */
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  /* LOAD DISTRICTS WHEN PROVINCE CHANGES */
  useEffect(() => {
    if (!selectedProvince) return;

    fetch(
      `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`
    )
      .then((res) => res.json())
      .then((data) => setDistricts(data.districts || []));

    setWards([]);
    setSelectedDistrict(null);
  }, [selectedProvince]);

  /* LOAD WARDS WHEN DISTRICT CHANGES */
  useEffect(() => {
    if (!selectedDistrict) return;

    fetch(
      `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`
    )
      .then((res) => res.json())
      .then((data) => setWards(data.wards || []));
  }, [selectedDistrict]);

  return {
    provinces,
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    setSelectedProvince,
    setSelectedDistrict,
  };
};