import { useState } from 'react';
import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';

import BaseModal from 'components/ui/BaseModal';
import BaseButton from 'components/ui/BaseButton';
import CalendarIcon from 'assets/imageComponents/CalendarIcon';
import { theme } from 'styles/theme';
import { useFilterStore } from 'store/articleFilter';
import { Country, FiltersState } from 'store/articleFilter/type';
import { formatDateForDisplayInput } from 'utils/date';

import 'react-datepicker/dist/react-datepicker.css';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FiltersState) => void;
}

const COUNTRIES = [
  { name: '대한민국', value: 'KOREA' },
  { name: '중국', value: 'CHINA' },
  { name: '일본', value: 'JAPAN' },
  { name: '미국', value: 'USA' },
  { name: '북한', value: 'NORTH_KOREA' },
  { name: '러시아', value: 'RUSSIA' },
  { name: '프랑스', value: 'FRANCE' },
  { name: '영국', value: 'UK' },
];

const FilterModal = ({ isOpen, onClose, onApplyFilters }: FilterModalProps) => {
  const { filters } = useFilterStore();
  const [localFilters, setLocalFilters] = useState<FiltersState>({
    searchTerm: filters.searchTerm || '',
    selectedDate: filters.selectedDate || null,
    selectedCountries: filters.selectedCountries || [],
  });

  const handleDateChange = (date: Date | null) => {
    setLocalFilters({ ...localFilters, selectedDate: date });
  };

  const isCountrySelected = (
    country: Country,
    selectedCountries: Country[]
  ) => {
    return selectedCountries.some((c) => c.value === country.value);
  };

  const handleCountrySelection = (selectedCountry: Country) => {
    setLocalFilters((prevFilters) => {
      const isSelected = isCountrySelected(
        selectedCountry,
        prevFilters.selectedCountries
      );
      return {
        ...prevFilters,
        selectedCountries: isSelected
          ? prevFilters.selectedCountries.filter(
              (c) => c.value !== selectedCountry.value
            )
          : [...prevFilters.selectedCountries, selectedCountry],
      };
    });
  };

  const applyFilters = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const displayDate = localFilters.selectedDate
    ? formatDateForDisplayInput(localFilters.selectedDate)
    : '날짜를 선택해주세요';

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <ModalContainer>
        <FilterOption>
          <HeadLineLabel htmlFor='searchTerm'>헤드라인</HeadLineLabel>
          <Input
            type='text'
            placeholder='검색하실 헤드라인을 입력해주세요'
            value={localFilters.searchTerm}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, searchTerm: e.target.value })
            }
          />
        </FilterOption>
        <FilterOption>
          <HeadLineLabel>날짜</HeadLineLabel>
          <ReactDatePicker
            selected={localFilters.selectedDate}
            onChange={handleDateChange}
            customInput={
              <CustomInputContainer>
                <span>{displayDate}</span>
                <CalendarIcon color={theme.colors.gray} />
              </CustomInputContainer>
            }
          />
        </FilterOption>
        <FilterOption>
          <HeadLineLabel>국가</HeadLineLabel>
          <CountriesContainer>
            {COUNTRIES.map((country) => (
              <CountryChip
                key={country.value}
                selected={isCountrySelected(
                  country,
                  localFilters.selectedCountries
                )}
                onClick={() => handleCountrySelection(country)}
              >
                {country.name}
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
  width: 295px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
`;

const CountryChip = styled.div<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? props.theme.colors.subBlue : props.theme.colors.white};
  color: ${(props) =>
    props.selected ? props.theme.colors.white : props.theme.colors.darkGray};
  border: 1px solid ${(props) => props.theme.colors.whiteChipBorder};
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  border-radius: 30px;
  padding: 6px 12px 4px;
  letter-spacing: -0.56px;
`;

const CustomInputContainer = styled.div`
  width: 295px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  padding: 10px 20px;
  border-radius: 8px;
  color: ${(props) => props.theme.colors.gray};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.56px;
`;
