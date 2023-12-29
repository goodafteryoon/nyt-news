import styled from 'styled-components';

import BaseModal from 'components/ui/BaseModal';
import BaseButton from 'components/ui/BaseButton';
import { useFilterStore } from 'store/articleFilter';
import { FiltersState } from 'store/articleFilter/type';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
  const { filters, setFilters } = useFilterStore();

  const handleCountrySelection = (country: string) => {
    const newCountries = filters.selectedCountries.includes(country)
      ? filters.selectedCountries.filter((c) => c !== country)
      : [...filters.selectedCountries, country];

    updateFilter('selectedCountries', newCountries);
  };

  const updateFilter = (key: keyof FiltersState, value: string | string[]) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const applyFilters = () => {
    // TODO : 필터에 따른 데이터 요청 로직 추가할 것
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
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
          />
        </FilterOption>
        <FilterOption>
          <HeadLineLabel>날짜</HeadLineLabel>
          <Input
            type='date'
            placeholder='날짜를 선택해주세요'
            value={filters.selectedDate}
            onChange={(e) => updateFilter('selectedDate', e.target.value)}
          />
        </FilterOption>
        <FilterOption>
          <HeadLineLabel>국가</HeadLineLabel>
          <CountriesContainer>
            {countries.map((country) => (
              <CountryChip
                key={country}
                selected={filters.selectedCountries.includes(country)}
                onClick={() => handleCountrySelection(country)}
              >
                {country}
              </CountryChip>
            ))}
          </CountriesContainer>
        </FilterOption>

        <BaseButton onClick={applyFilters} buttonText='필터 적용하기' />
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
