import styled from 'styled-components';

import { theme } from 'styles/theme';
import { useFilterStore } from 'store/articleFilter';
import CalendarIcon from 'assets/imageComponents/CalendarIcon';
import SearchIcon from 'assets/imageComponents/SearchIcon';

interface FilterHeaderProps {
  onOpenModal: () => void;
}

const ALL_HEADLINES = '전체 헤드라인';
const ALL_DATES = '전체 날짜';
const ALL_COUNTRIES = '전체 국가';

const FilterHeader = ({ onOpenModal }: FilterHeaderProps) => {
  const { filters } = useFilterStore();
  const { searchTerm, selectedDate, selectedCountries } = filters;

  const isSearchTermActive = !!searchTerm && searchTerm.trim() !== '';
  const isDateActive = !!selectedDate && selectedDate.trim() !== '';
  const isCountriesActive = selectedCountries.length > 0;

  const getCountryDisplay = () => {
    const count = selectedCountries.length;
    if (count === 0) return ALL_COUNTRIES;
    if (count === 1) return selectedCountries[0].name;
    return `${selectedCountries[0].name} 외 ${count - 1}개`;
  };

  return (
    <>
      <Wrapper>
        <Container>
          <FilterChip onClick={onOpenModal} $isActive={isSearchTermActive}>
            <SearchIcon
              color={
                isSearchTermActive
                  ? theme.colors.mainBlue
                  : theme.colors.darkGray
              }
            />
            {searchTerm || ALL_HEADLINES}
          </FilterChip>
          <FilterChip onClick={onOpenModal} $isActive={isDateActive}>
            <CalendarIcon
              color={
                isDateActive ? theme.colors.mainBlue : theme.colors.darkGray
              }
            />
            {selectedDate || ALL_DATES}
          </FilterChip>
          <FilterChip onClick={onOpenModal} $isActive={isCountriesActive}>
            {getCountryDisplay()}
          </FilterChip>
        </Container>
      </Wrapper>
    </>
  );
};

export default FilterHeader;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 560px;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: ${(props) => props.theme.colors.white};
  font-size: 14px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const FilterChip = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: 34px;
  padding: 0 12px;
  border-radius: 30px;
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.mainBlue : theme.colors.black};
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? theme.colors.mainBlue : theme.colors.gray};
`;
