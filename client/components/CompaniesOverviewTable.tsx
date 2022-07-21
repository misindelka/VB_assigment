// External Imports
import styled from 'styled-components'

// Component Types

interface Icompany {
  id: string
  name: string
  stage: string
  sector: string
  investmentSize: number
}

// Styled Types

interface IStyledProps {
  textPosition: string
  right: string
}
interface IStyledRow {
  index: number
}

//  Table Styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  table-layout: fixed;
  border-radius: 6px 6px 6px 6px;
  margin: 20px 100px 20px 100px;
`

const TitleWrapper = styled.div`
  justify-content: flex-start;
`

const Table = styled.table`
  width: 800px;
  border-collapse: collapse;
  table-layout: fixed;
  border: 1px solid ${props => props.theme.colors.bgSecondary};
  border-radius: 6px 6px 6px 6px;
  margin: 20px 100px 20px 100px;
`
const Row = styled.tr<IStyledRow>`
  background: ${props =>
    props.index % 2 === 0 ? props.theme.colors.bgSecondary : props.theme.colors.bg};
`
const TableHead = styled.thead`
  text-align: left;
`

const TableHeading = styled.th<IStyledProps>`
  font-size: 12px;
  font-weight: 200;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  text-align: ${props => props.textPosition};
  margin-right: ${props => props.right};
`

const TableData = styled.td<IStyledProps>`
  font-size: 14px;
  height: 100%;
  vertical-align: middle;
  padding: 10px;
  text-align: ${props => props.textPosition};
  margin-left: ${props => props.right};
`

const Button = styled.button`
  width: 200px;
  height: 30px;
  background-color: green;
  decoration: none;
  border-radius: 10px;
  border: none;
  color: white;
`

// Component

export const ComapniesOverviewTable: React.FC = ({ companies, openModal }: any) => {
  return (
    <>
      <TitleWrapper>
        <h1>Comapnies Overview</h1>
      </TitleWrapper>
      <Container>
        <Table>
          <TableHead>
            <Row index={1}>
              <TableHeading textPosition="start" right="10px">
                company name
              </TableHeading>
              <TableHeading textPosition="start" right="10px">
                stage
              </TableHeading>
              <TableHeading textPosition="end" right="0px">
                sector
              </TableHeading>
              <TableHeading textPosition="end" right="500px">
                investment size
              </TableHeading>
            </Row>
          </TableHead>
          <tbody>
            {companies?.map((company: Icompany, i: number) => (
              <Row key={company.id} index={i}>
                <TableData textPosition="start" right="0px">
                  {company.name}
                </TableData>
                <TableData textPosition="start" right="0px">
                  {company.stage}
                </TableData>
                <TableData textPosition="end" right="0px">
                  {company.sector}
                </TableData>
                <TableData textPosition="end" right="300px">
                  {company.investmentSize}
                </TableData>
              </Row>
            )) ?? null}
          </tbody>
        </Table>
        <Button onClick={openModal}>Add New Company</Button>
      </Container>
    </>
  )
}
