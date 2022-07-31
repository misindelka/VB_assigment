// External Imports
import { useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import { useMutation } from '@apollo/client'
import { ADD_COMPANY, GET_COMPANIES } from '@client/graphql'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

// types
interface IProps {
  showModal: () => void
  setShowModal: (prev: any) => void
}

// Styled Types

interface IStyledProps {
  chancel: boolean
}

// Component Styles
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 300px;
`

const ModalWrapper = styled.div`
  width: 500px;
  height: 700px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.5);
  background: ${props => props.theme.colors.bg};
  z-index: 10;
  border-radius: 10px;
`

const StyledForm = styled(Formik)`
  width: 100%;
  max-width: 800px;
  padding: 0 40px;
  background: ${props => props.theme.colors.bg};
  color: ${props => props.theme.colors.text};
  border-radius: 10px;
  box-sizing: border-box;
`
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  background: ${props => props.theme.colors.bgSecondary};
`

const HeaderLabel = styled.h2`
  margin: 0;
  padding: 0 20px 0 20px;
`

const HeaderText = styled.p`
  margin: 0;
  padding: 0 20px 0 20px;
  color: ${props => props.theme.colors.text};
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding-top: 10px;
  padding-left: 450px;
  z-index: 10;
  color: ${props => props.theme.colors.text};
`

const StyledInput = styled(Field)`
  width: 95%;
  background: none;
  color: ${props => props.theme.colors.text};
  padding: 10px;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 5px;
  :focus {
    outline: none;
  }
`

export const StyledInlineErrorMessage = styled.div`
  background-color: rgb(255, 245, 245);
  color: rgb(120, 27, 0);
  display: block;
  padding: 0.1rem 0.75rem;
  margin: 5px;
  white-space: pre-line;

  border-radius: 3px;
`
const StyledSelect = styled(Field)`
  width: 100%;
  background: none;
  color: ${props => props.theme.colors.text};
  padding: 10px;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 5px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 30px;
`

const Button = styled.button<IStyledProps>`
  width: 120px;
  height: 30px;
  background: ${props => (props.chancel ? props.theme.colors.bg : 'green')};
  decoration: none;
  border-radius: 10px;
  border: none;
  color: white;
  margin: 10px;
`
const StyledInputLabel = styled.h5``

const initalState = {
  name: '',
  stage: '',
  sector: '',
  investmentSize: '',
}

export const ValidatesFormModal: React.FC<IProps> = ({ showModal, setShowModal }: IProps) => {
  const modalRef = useRef()
  const stageConfig = [
    'Select stage from list',
    'Prototype',
    'Idea',
    'Series A',
    'Series B',
    'Series C',
    'Seed',
  ]
  const sectorConfig = ['Select sector from list', 'Fintech', 'Insutech', 'IOT', 'Roboadvisory']

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter company name '),
    stage: Yup.string().required('Please select stage from list '),
    sector: Yup.string().required('Please select sector from list '),
    investmentSize: Yup.number().min(100).required('Please enter investment amount'),
  })

  // fucntions
  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false)
    }
  }

  const handleEscapeKey = useCallback(
    e => {
      if (e.key === 'Escape') {
        setShowModal(false)
      }
    },
    [setShowModal, showModal],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [handleEscapeKey])

  const [addCompany] = useMutation(ADD_COMPANY, {
    refetchQueries: [{ query: GET_COMPANIES }],
  })

  const handleSubmit = (values: any) => {
    addCompany({
      variables: {
        ...values,
        investmentSize: parseInt(values.investmentSize),
      },
    })
    setShowModal((prev: any) => !prev)
  }

  return (
    <>
      {showModal ? (
        <Container
          onClick={closeModal}
          ref={modalRef as unknown as React.RefObject<HTMLDivElement>}
        >
          <ModalWrapper showModal={showModal}>
            <HeaderContainer>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev: any) => !prev)}
              />
              <HeaderLabel>Add new company</HeaderLabel>
              <HeaderText>
                Add new company by filling all the requiuLorem ipsum dolor sit amet, consectetur
                adipiscing elit. Fusce feu
              </HeaderText>
            </HeaderContainer>

            <ModalContent>
              <StyledForm
                initialValues={initalState}
                validationSchema={validationSchema}
                onSubmit={values => {
                  handleSubmit(values)
                }}
              >
                {({ errors, touched, handleSubmit }) => {
                  return (
                    <>
                      <Form name="contact" method="post" onSubmit={handleSubmit}>
                        <StyledInputLabel>Company name</StyledInputLabel>
                        <StyledInput
                          type="text"
                          name="name"
                          autoCorrect="off"
                          placeholder="Please enter company name "
                        />
                        {errors.name && touched.name && (
                          <StyledInlineErrorMessage>{errors.name}</StyledInlineErrorMessage>
                        )}

                        <StyledInputLabel>Stage</StyledInputLabel>
                        <StyledSelect component="select" name="stage" id="stage" autoCorrect="off">
                          {stageConfig?.map(stage => (
                            <option key={stage} value={stage} label={stage}>
                              {stage}
                            </option>
                          ))}
                        </StyledSelect>
                        {errors.stage && touched.stage && (
                          <StyledInlineErrorMessage>{errors.stage}</StyledInlineErrorMessage>
                        )}

                        <StyledInputLabel>Sector</StyledInputLabel>
                        <StyledSelect component="select" name="sector">
                          {sectorConfig?.map(sector => (
                            <option key={sector}>{sector}</option>
                          ))}
                        </StyledSelect>
                        {errors.stage && touched.stage && (
                          <StyledInlineErrorMessage>{errors.stage}</StyledInlineErrorMessage>
                        )}

                        <StyledInputLabel>Investment size</StyledInputLabel>
                        <StyledInput type="text" name="investmentSize" placeholder="Enter amount" />

                        {errors.investmentSize && touched.investmentSize && (
                          <StyledInlineErrorMessage>
                            {errors.investmentSize}
                          </StyledInlineErrorMessage>
                        )}
                        <ButtonWrapper>
                          <Button onClick={() => setShowModal((prev: any) => !prev)} chancel={true}>
                            Cancel
                          </Button>
                          <Button type="submit" onClick={handleSubmit}>
                            Add Company
                          </Button>
                        </ButtonWrapper>
                      </Form>
                    </>
                  )
                }}
              </StyledForm>
            </ModalContent>
          </ModalWrapper>
        </Container>
      ) : null}
    </>
  )
}
