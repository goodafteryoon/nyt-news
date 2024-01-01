import styled from 'styled-components';

import { theme } from 'styles/theme';
import CalendarIcon from 'assets/imageComponents/CalendarIcon';
import SearchIcon from 'assets/imageComponents/SearchIcon';
import { formatDateForDisplayHeader } from 'utils/date';
import { FiltersState } from 'store/articleFilter/type';

interface FilterHeaderProps {
  onOpenModal: () => void;
  filters: FiltersState;
}

const ALL_HEADLINES = '전체 헤드라인';
const ALL_DATES = '전체 날짜';
const ALL_COUNTRIES = '전체 국가';

const FilterHeader = ({ onOpenModal, filters }: FilterHeaderProps) => {
  const { searchTerm, selectedDate, selectedCountries } = filters;

  const isSearchTermActive = !!searchTerm && searchTerm.trim() !== '';
  const isDateActive = !!selectedDate;
  const isCountriesActive = (selectedCountries || []).length > 0;

  const getCountryDisplay = () => {
    const countries = selectedCountries || [];

    const count = countries.length;
    if (count === 0) return ALL_COUNTRIES;
    if (count === 1) return countries[0].name;
    return `${countries[0].name} 외 ${count - 1}개`;
  };

  const displayDate = selectedDate
    ? formatDateForDisplayHeader(selectedDate)
    : ALL_DATES;

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
            {displayDate}
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
  // TODO : font 적용 이슈 해결
  font-family: Apple SD Gothic Neo;
  gap: 4px;
  height: 34px;
  padding: 6px 12px 4px;
  border-radius: 30px;
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.mainBlue : theme.colors.black};
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? theme.colors.mainBlue : theme.colors.gray};
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  letter-spacing: -0.56px;
`;
