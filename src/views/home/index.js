import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Card, Dropdown, Badge, Modal } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import api from 'services/api';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Swal from 'sweetalert2';


const DashboardsAnalytic = () => {
    const title = 'Home';
    const description = 'Home';

    const breadcrumbs = [
        { to: '', text: 'Home' },
        { to: 'dashboards', text: 'Contratos' },
    ]

    const [data, setData] = useState(false)
    const [contract, setContract] = useState(false)
    const [modalContract, setModalContract] = useState(false)

    useEffect(() => {

        getPendingContracts()

    }, [])



    const getPendingContracts = async () => {
        try {
            const response = await api.get(`/api/v1/private/contract_signature/pending`)


            if (response.data.length > 0) {
                response.data.map((row) => {
                    if (row.regulation === null) {
                        setContract(row)
                        return
                    }
                })
            }

        } catch (error) {

        }
    }

    const submitContract = async () => {
        try {
            const response = await api.post(`/api/v1/private/contract_signature/store/${contract.c_id}`, {
                'regulation': true
            })

            Swal.fire({
                title: response.data.title,
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'Fechar'
            }).then((result) => {
                setTimeout(() => {
                    setContract(false)
                    getPendingContracts()
                    setModalContract(false)
                }, 1000)
            })

        } catch (error) {
            Swal.fire({
                title: error.response.data.title,
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Fechar'
            })
        }
    }

    return (
        <>
            <HtmlHead title={title} description={description} />
            {/* Title and Top Buttons Start */}
            <div className="page-title-container">
                <Row>
                    {/* Title Start */}
                    <Col md="7">
                        <h1 className="mb-0 pb-0 display-4">{title}</h1>
                        <BreadcrumbList items={breadcrumbs} />
                    </Col>
                    {/* Title End */}
                </Row>
            </div>
            {/* Title and Top Buttons End */}


            {contract
                ? <>
                    <Row>
                        <Col sm={12} xs={12} lg={12} md={12} >
                            <Card>
                                <Card.Body >
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <CsLineIcons icon="file-text" className="text-primary" size={50} />
                                    </div>


                                    <div className='d-flex justify-content-center align-items-center mt-4'>
                                        <h2 className=" mb-0 text-primary text-center">
                                            Você possui um contrato pendente
                                        </h2>
                                    </div>

                                    <p className="text-medium mb-0 text-muted text-white mt-4 text-center">
                                        Temos um contrato pendente da sua assinatura, clique no botão abaixo para visualizar e assinar o contrato.
                                    </p>

                                    <div className='d-flex justify-content-center align-items-center mt-4'>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            onClick={() => setModalContract(true)}
                                        >
                                            Assinar contrato
                                        </Button>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
                : <>
                    <Row>
                        <Col sm={12} xs={12} lg={12} md={12} >
                            <Card>
                                <Card.Body >
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <CsLineIcons icon="info-hexagon" className="text-warning" size={50} />
                                    </div>


                                    <div className='d-flex justify-content-center align-items-center mt-4'>
                                        <h2 className=" mb-0 text-warning text-center">
                                            Nenhum contrato pendente
                                        </h2>
                                    </div>

                                    <p className="text-medium mb-0 text-muted text-white mt-4 text-center">
                                        Não localizamos nenhum contrato pendente no momento, caso queira visualizar o  histórico de assinaturas acesso no menu <br /> <b>"Minhas Assinaturas" </b>
                                    </p>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>

            }



            <Modal
                show={modalContract}
                size='lg'
                centered
                onHide={() => setModalContract(false)}
            >
                <Modal.Body>
                    <Row>
                        <Col xs={10}>
                            &nbsp;
                        </Col>
                        <Col xs={2}>
                            <div className='d-flex justify-content-end cursor-pointer' onClick={() => setModalContract(false)}>
                                <CsLineIcons icon="close" className="text-primary" size={20} />
                            </div>
                        </Col>
                    </Row>

                    <Col xs={12} className="mt-4">
                        <span className='text-primary'><b>Título:</b> </span> {contract.title}
                    </Col>

                    <Col xs={12} className="mt-4">
                        <span className='text-primary'><b>Descrição:</b> </span> {contract.description}
                    </Col>

                    <Col xs={12} className="mt-4">
                        <span className='text-primary'><b>Contrato:</b> </span>


                        <div style={{ margin: 5, padding: 5, border: '1px solid #ccc', whiteSpace: 'nowrap', width: '100%', display: 'inline-block', wordBreak: 'break-all' }}>
                            <div
                                className='box-contract'
                                dangerouslySetInnerHTML={{ __html: contract.content }}
                            />
                        </div>
                    </Col>


                    <p className="h6 text-white mt-4 mb-4">
                        Ao clicar em <b> "Assinar contrato" </b> declaro que li e concordo com os termos descritos acima.
                    </p>

                    <div className='d-flex justify-content-center align-items-center mt-4'>
                        <Button
                            variant="success"
                            type="submit"
                            onClick={() => submitContract()}
                        >
                            Assinar contrato
                        </Button>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
};

export default DashboardsAnalytic;
