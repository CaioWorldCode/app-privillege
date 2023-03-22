import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import axios from 'axios';
import { API_URL } from 'config';
import Swal from 'sweetalert2';

const Register = () => {
	const title = 'Registro';
	const description = 'Registro';

	const [loading, setLoading] = useState(false)
	const [submited, setSubmited] = useState(false)

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Este campo é obrigatório'),
		email: Yup.string().email('Este precisa ser um campo de e-mail válido').required('Este campo é obrigatório'),
		taxid: Yup.string().required('Este campo é obrigatório'),
		password: Yup.string().min(6, 'Must be at least 6 chars!').required('Este campo é obrigatório'),
		terms: Yup.bool().required().oneOf([true], 'Políticas precisam ser aceitas'),
	});

	const initialValues = { name: '', email: '', password: '', taxid: '', terms: false };


	const onSubmit = async (values) => {


		if (values.password !== values.password) {
			return
		}
		setLoading(true)
		try {
			await axios.post(`${API_URL}/api/v1/auth/register`, {
				name: values.name,
				email: values.email,
				taxid: values.taxid,
				password: values.password,
				password_confirmation: values.confirm_password,
				regulation: true
			})

			setSubmited(true)
		} catch (error) {
			Swal.fire({
				title: error.response.data.title,
				text: error.response.data.message,
				icon: 'error',
				confirmButtonText: 'Fechar'
			})
		}
		setLoading(false)
	}

	const formik = useFormik({ initialValues, validationSchema, onSubmit });
	const { handleSubmit, handleChange, values, touched, errors } = formik;

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
											Cadastro enviado com sucesso!
										</h2>

										<p className="text-medium mb-0 text-muted text-white">
											Enviamos um e-mail de confirmação, por favor clique no link para ativar sua conta.
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
							? <div className="align-items-center">
								<Spinner as="span" animation="border" size="md" />

								<div>Aguarde...</div>
							</div>
							: <>
								<div className="sh-11">
									<NavLink to="/">
										<div className="logo-default" />
									</NavLink>
								</div>
								<div className="mb-5">
									<h2 className="cta-1 mb-0 text-primary">Cadastro</h2>
								</div>
								<div className="mb-5">
									<p className="h6 text-white">Preencha o formulário abaixo para efetuar o registro.</p>
									<p className="h6 text-white">
										Já tem cadastro? <NavLink to="/login">Voltar para login</NavLink>.
									</p>
								</div>
								<div>
									<form id="registerForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
										<div className="mb-3 filled form-group tooltip-end-top">
											<CsLineIcons icon="user" />
											<Form.Control type="text" name="name" placeholder="Name" value={values.name} onChange={handleChange} />
											{errors.name && touched.name && <div className="d-block invalid-tooltip">{errors.name}</div>}
										</div>
										<div className="mb-3 filled form-group tooltip-end-top">
											<CsLineIcons icon="email" />
											<Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
											{errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
										</div>
										<div className="mb-3 filled form-group tooltip-end-top">
											<CsLineIcons icon="list" />
											<Form.Control type="text" name="taxid" placeholder="CPF ou CNPJ" value={values.taxid} onChange={handleChange} />
											{errors.taxid && touched.taxid && <div className="d-block invalid-tooltip">{errors.taxid}</div>}
										</div>
										<div className="mb-3 filled form-group tooltip-end-top">
											<CsLineIcons icon="lock-off" />
											<Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Senha" />
											{errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
										</div>
										<div className="mb-3 filled form-group tooltip-end-top">
											<CsLineIcons icon="lock-on" />
											<Form.Control type="password" name="confirm_password" onChange={handleChange} value={values.confirm_password} placeholder="Confirmar senha" />
											{errors.confirm_password && touched.confirm_password && <div className="d-block invalid-tooltip">{errors.confirm_password}</div>}
										</div>
										<div className="mb-3 position-relative form-group">
											<div className="form-check">
												<input type="checkbox" className="form-check-input" name="terms" onChange={handleChange} value={values.terms} />
												<label className="form-check-label">
													Eu li e concordo com as {' '}
													<NavLink to="/" target="_blank">
														políticas de uso e privacidade.
													</NavLink>
												</label>
												{errors.terms && touched.terms && <div className="d-block invalid-tooltip">{errors.terms}</div>}
											</div>
										</div>
										<Button size="lg" type="submit">
											Cadastrar
										</Button>
									</form>
								</div>
							</>
						}
					</>
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

export default Register;
