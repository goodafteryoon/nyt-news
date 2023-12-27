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

const countries = [
  '대한민국',
  '중국',
  '일본',
  '미국',
  '북한',
  '러시아',
  '프랑스',
  '영국',
];

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
      <ModalContainer>
        <FilterOption>
          <HeadLineLabel htmlFor='searchTerm'>헤드라인</HeadLineLabel>
          <Input
            type='text'
            placeholder='검색하실 헤드라인을 입력해주세요'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterOption>
        <FilterOption>
          <HeadLineLabel>날짜</HeadLineLabel>
          <Input
            type='date'
            placeholder='날짜를 선택해주세요'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </FilterOption>
        <FilterOption>
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
        </FilterOption>

        <Button onClick={handleApplyFilter}>필터 적용하기</Button>
      </ModalContainer>
    </BaseModal>
  );
};

export default FilterModal;

const ModalContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FilterOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HeadLineLabel = styled.label`
  line-height: 24px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black};
`;

const Input = styled.input`
  width: 295px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  padding: 10px 20px;
  border-radius: 8px;
`;
const CountriesContainer = styled.div`
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

const CountryChip = styled.div<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? props.theme.colors.mainBlue : props.theme.colors.gray};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  border-radius: 30px;
  display: flex;
  padding: 6px 12px 4px 12px;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 295px;
  height: 60px;
  border-radius: 16px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainBlue};
`;
