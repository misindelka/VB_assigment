// External Imports
import styled from 'styled-components'

// Component Styles
const Container = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  justify-content: center;
  align-items: center;
  padding: 0 200px 0 200px;
`

const TitleWrapper = styled.div`
  justify-content: flex-start;
  padding-bottom: 10px;
`
const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 165px;
  height: 100px;
  background: ${props => props.theme.colors.bgSecondary};
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  :hover {
    transition: transform 0.2s; /* Animation */
    background: ${props => props.theme.colors.hover};
    width: 201;
    height: 101px;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const CompaniesNumber = styled.h1`
  margin: 0;
`
const SectorTittle = styled.p`
  margin: 0;
  text-color: ${props => props.theme.colors.textSecondary};
  font-size: 10px;
`

const Asset = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: lightGreen;
  color: ${props => props.theme.colors.bgSecondary};
  margin-left: 30px;
`

// Component
export const ComapniesSectors = ({ companies }: any) => {
  const sectorConfig = ['Fintech', 'Insutech', 'IOT', 'Roboadvisory']
  const numberOfCompanies = companies
    ?.map(({ sector }: any) => sector)
    ?.reduce((prev, cur) => {
      prev[cur] = (prev[cur] || 0) + 1
      return prev
    }, {})

  return (
    <>
      <TitleWrapper>
        <h1>Comapnies by sectors</h1>
      </TitleWrapper>
      <Container>
        {sectorConfig?.map((sector, i) => (
          <CardWrapper>
            <ContentWrapper key={i}>
              {numberOfCompanies?.[sector] ? (
                <CompaniesNumber>{numberOfCompanies?.[sector]}</CompaniesNumber>
              ) : (
                <CompaniesNumber>0</CompaniesNumber>
              )}
              <SectorTittle>{sector}</SectorTittle>
            </ContentWrapper>
            <Asset>S</Asset>
          </CardWrapper>
        ))}
      </Container>
    </>
  )
}
