import { useState } from 'react';

import BaseModal from 'components/ui/BaseModal';
import styled from 'styled-components';

interface FilterOptions {
  searchTerm: string;
  selectedDate: string;
  selectedCountries: string[];
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filters: FilterOptions) => void;
}

const countries = ['대한민국', '중국', '일본'];

const FilterModal = ({ isOpen, onClose, onApplyFilter }: FilterModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handleCountrySelection = (country: string) => {
    setSelectedCountries(
      (prevSelected) =>
        prevSelected.includes(country)
          ? prevSelected.filter((c) => c !== country) // 선택 해제
          : [...prevSelected, country] // 선택
    );
  };

  // 필터 적용 및 모달 닫기
  const handleApplyFilter = () => {
    onApplyFilter({ searchTerm, selectedDate, selectedCountries });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <HeadLineLabel htmlFor='searchTerm'>헤드라인</HeadLineLabel>
      <Input
        type='text'
        placeholder='검색하실 헤드라인을 입력해주세요'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <HeadLineLabel>날짜</HeadLineLabel>
      <Input
        type='date'
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <HeadLineLabel>국가</HeadLineLabel>
      <CountriesContainer>
        {countries.map((country) => (
          <CountryChip
            key={country}
            selected={selectedCountries.includes(country)}
            onClick={() => handleCountrySelection(country)}
          >
            {country}
          </CountryChip>
        ))}
      </CountriesContainer>

      <button onClick={handleApplyFilter}>필터 적용하기</button>
    </BaseModal>
  );
};

export default FilterModal;

const HeadLineLabel = styled.label`
  line-height: 24px;
  font-weight: 700;
  letter-spacing: -5%;
  color: ${(props) => props.theme.colors.black};
`;

const Input = styled.input`
  width: 295px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  padding: 10px 20px;
  border-radius: 8px;
`;
const CountriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px; // 간격 추가
`;

const CountryChip = styled.div<{ selected: boolean }>`
  padding: 5px 15px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.mainBlue : props.theme.colors.gray};
  color: white;
  cursor: pointer;
  user-select: none;
`;
