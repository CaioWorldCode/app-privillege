import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import axios from 'axios';
import { API_URL } from 'config';
import Swal from 'sweetalert2';

const ActivateAccount = (props) => {
    const location = useLocation()
    const title = 'Registro';
    const description = 'Registro';

    const [loading, setLoading] = useState(false)
    const [submited, setSubmited] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {

        const queryParams = new URLSearchParams(location.search)

        let code = queryParams.get('code')
        let email = queryParams.get('email')

        verifyCode(code, email)

    }, [])

    const verifyCode = async (code, email) => {
        setLoading(true)

        try {
            await axios.post(`${API_URL}/api/v1/auth/activate_account`, {
                code: code,
                email: email
            })

            setSubmited(true)
        } catch (error) {
            setError(true)
        }

        setLoading(false)
    }


    const leftSide = (
        <></>
    );


    const rightSide = (
        <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
            <div className="sw-lg-50 px-5">

                {submited
                    ? <>
                        <Row className="g-2 mb-5">
                            <Col sm="12" xxl="12">
                                <Card className="sh-19">
                                    <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                                        <CsLineIcons icon="check-circle" className="text-success" size={50} />
                                        <h2 className=" mb-0 text-success">
                                            Conta ativada
                                        </h2>

                                        <p className="text-medium mb-0 text-muted text-white">
                                            Sua conta foi ativada com sucesso, você já pode efetuar o login.
                                        </p>

                                        <p className="text-medium mb-0 text-muted text-white">
                                            <NavLink to="/login">
                                                Clique aqui &nbsp;
                                            </NavLink>
                                            para voltar para o login.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
                    : <>
                        {loading
                            ? <>
                                <div className="align-items-center">
                                    <Spinner as="span" animation="border" size="md" />

                                    <div>Aguarde...</div>
                                </div>
                            </>
                            : <></>
                        }
                    </>
                }

                {error
                    ? <>

                        <Row className="g-2 mb-5">
                            <Col sm="12" xxl="12">
                                <Card className="sh-19">
                                    <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                                        <CsLineIcons icon="close" className="text-danger" size={50} />
                                        <h2 className=" mb-0 text-danger">
                                            Erro ao ativar conta
                                        </h2>

                                        <p className="text-medium mb-0 text-muted text-white">
                                            Não foi possível ativar sua conta, se o erro persistir, entre em contato com o administrador do sistema.
                                        </p>

                                        <p className="text-medium mb-0 text-muted text-white">
                                            <NavLink to="/login">
                                                Clique aqui &nbsp;
                                            </NavLink>
                                            para voltar para o login.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
                    : <></>
                }


            </div>
        </div>
    );

    return (
        <>
            <HtmlHead title={title} description={description} />
            <LayoutFullpage left={leftSide} right={rightSide} />
        </>
    );
};

export default ActivateAccount;
