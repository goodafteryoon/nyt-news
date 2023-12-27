import styled from 'styled-components';

import { theme } from 'styles/theme';
import CalendarIcon from 'assets/imageComponents/CalendarIcon';
import SearchIcon from 'assets/imageComponents/SearchIcon';

interface FiltersState {
  searchTerm: string;
  selectedDate: string;
  selectedCountries: string[];
}

interface FilterHeaderProps {
  filters: FiltersState;
  onOpenModal: () => void;
}

const FilterHeader = ({ filters, onOpenModal }: FilterHeaderProps) => {
  const { searchTerm, selectedDate, selectedCountries } = filters;

  const getCountryDisplay = () => {
    const count = selectedCountries.length;
    if (count === 0) return '전체 국가';
    if (count === 1) return selectedCountries[0];
    return `${selectedCountries[0]} 외 ${count - 1}개`;
  };

  return (
    <>
      <Wrapper>
        <Container>
          <FilterChip onClick={onOpenModal}>
            <SearchIcon color={theme.colors.darkGray} />
            {searchTerm || '전체 헤드라인'}
          </FilterChip>
          <FilterChip onClick={onOpenModal}>
            <CalendarIcon color={theme.colors.darkGray} />
            {selectedDate || '전체 날짜'}
          </FilterChip>
          <FilterChip onClick={onOpenModal}>{getCountryDisplay()}</FilterChip>
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

const FilterChip = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: 34px;
  padding: 0 12px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.colors.gray};
`;
