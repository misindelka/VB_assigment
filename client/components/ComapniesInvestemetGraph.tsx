// External Imports
import styled from 'styled-components'
import { Chart } from 'react-google-charts'

// interna Imports
import { CompanyType } from '@client/graphql'

// types

interface IProps {
  companies: CompanyType[]
}

// Component Styles
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
  padding-bottom: 20px;
`

// Component
export const ComapniesInvestemetGraph: React.FC<IProps> = ({ companies }) => {
  const companiesData = companies?.map(({ name, investmentSize }: any) => {
    return [name, investmentSize]
  })
  const donutConfig = ['name', 'amount']
  const data = [donutConfig]?.concat(companiesData)

  const options = {
    pieHole: 0.4,
    is3D: false,
    backgroundColor: '#1d1e23',
    textColor: 'white',
    pieSliceText: 'none',
    chartArea: {
      width: '100%',
      height: '80%',
    },
    legend: {
      position: 'right',
      alignment: 'top',
      textStyle: {
        color: 'white',
        fontSize: 12,
      },
    },
  }

  return (
    <>
      <TitleWrapper>
        <h1>Comapnies by investment size</h1>
      </TitleWrapper>
      <Container>
        <Chart
          style={{ backgroundColor: 'red' }}
          chartType="PieChart"
          width="800px"
          height="300px"
          data={data}
          options={options}
        />
      </Container>
    </>
  )
}
