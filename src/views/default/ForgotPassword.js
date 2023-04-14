import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import axios from 'axios';
import { API_URL } from 'config';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
	const [loading, setLoading] = useState(false)
	const [step, setStep] = useState(1)
	const [code, setCode] = useState(false)
	const [email, setEmail] = useState(false)
	const [redirect, setRedirect] = useState(false)

	const title = 'Forgot Password';
	const description = 'Forgot Password Page';

	const validationSchema = Yup.object().shape({
		email: Yup.string().email().required('Email is required'),
	});

	const initialValues = { email: '' };

	const onSubmit = async (values) => {
		setLoading(true)

		try {
			const response = await axios.post(`${API_URL}/api/v1/auth/forgot-password`, {
				email: values.email
			})

			if (response.status === 200) {
				setStep(2)
				setEmail(values.email)
			} else {
				Swal.fire({
					title: 'Não foi possível completar solicitação',
					text: 'Verifique as informações e tente novamente',
					icon: 'error',
					confirmButtonText: 'Fechar'
				})
			}
		} catch (error) {
			Swal.fire({
				title: 'Não foi possível completar solicitação',
				text: 'Verifique as informações e tente novamente',
				icon: 'error',
				confirmButtonText: 'Fechar'
			})
		}

		setLoading(false)
	}



	const formik = useFormik({ initialValues, validationSchema, onSubmit });
	const { handleSubmit, handleChange, values, touched, errors } = formik;



	const leftSide = (
		<div className="min-h-100 d-flex align-items-center">
			<div className="w-100 w-lg-75 w-xxl-50">
				<div>

				</div>
			</div>
		</div>
	);

	const rightSide = (
		<div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
			<div className="sw-lg-50 px-5">
				<div className="sh-11">
					<NavLink to="/">
						<div className="logo-default" />
					</NavLink>
				</div>

				{step === 1
					? <>
						<div className="mb-5">
							<h2 className="cta-1 mb-0 text-primary">Esqueceu a senha?</h2>
						</div>
						<div className="mb-5">
							<p className="h6 text-white">Por favor, informe seu e-mail para enviarmos o código de recuperaçao.</p>
							<p className="h6 text-white">
								Ou,  <NavLink to="/login">clique aqui </NavLink> para voltar para o login.
							</p>
						</div>
						<div>
							<form id="forgotPasswordForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
								<div className="mb-3 filled form-group tooltip-end-top">
									<CsLineIcons icon="email" />
									<Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
									{errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
								</div>
								<Button
									size="lg"
									type="submit"
									variant="primary"
									disabled={loading}

								>
									{loading
										? <Spinner as="span" animation="border" size="sm" />
										: <>Enviar código de recuperação</>
									}
								</Button>
							</form>
						</div></>
					: <></>
				}

				{step === 2
					? <>
						<div className="mb-5">
							<h2 className="cta-1 mb-0 text-primary">Recuperar senha?</h2>
						</div>
						<div className="mb-5">
							<p className="h6 text-white">Enviamos um código para o seu e-mail <br /><br /> Informe o código abaixo para trocar a sua senha.</p>
						</div>
						<div>
							<Formik
								initialValues={{ email: '', password: '' }}
								validate={values => {
									const errors = {};
									if (!values.code) {
										errors.code = 'Obrigatório';
									}
									return errors;
								}}
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(() => {
										setCode(values.code)
										setStep(3)
										setSubmitting(false);
									}, 400);
								}}
							>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									isSubmitting,
								}) => (
									<form id="forgotPasswordForm2" className="tooltip-end-bottom" onSubmit={handleSubmit}>
										<div className="mb-3 filled form-group tooltip-end-top">
											<input
												className='form-control'
												type="text"
												name="code"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.code}
												placeholder='Informe o código enviado para seu e-mail'
											/>
											<CsLineIcons icon="shield" />
											{errors.code && touched.code && <div className="d-block invalid-tooltip">{errors.code}</div>}
										</div>
										<Button
											size="lg"
											type="submit"
											variant="success"
											disabled={isSubmitting}

										>
											{isSubmitting
												? <Spinner as="span" animation="border" size="sm" />
												: <>Próximo</>
											}
										</Button>
									</form>
								)}
							</Formik>

						</div>
					</>
					: <></>
				}
				{/* LtRTxK */}

				{step === 3
					? <>
						<div className="mb-5">
							<h2 className="cta-1 mb-0 text-primary">Nova senha?</h2>
						</div>

						<div className="mb-5">
							<p className="h6 text-white">Escolha uma nova senha <br /> <br /> Lembre-se de não fornecer sua senha para ninguém e mante-la em um local seguro.</p>
						</div>

						<Formik
							initialValues={{ email: '', password: '' }}
							validate={values => {
								const errors = {};
								if (!values.password) {
									errors.password = 'Obrigatório';
								}

								if (!values.password2) {
									errors.password2 = 'Obrigatório';
								}

								if (values.password.length <= 6) {
									errors.password = 'A sua senha precisa ter no mínimo 6 caracteres';
								}

								if (values.password && values.password !== values.password2) {
									errors.password = 'As senhas precisam ser iguais';
								}

								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(async () => {

									try {
										await axios.post(`${API_URL}/api/v1/auth/update-password`, {
											email: email,
											password: values.password,
											password_confirmation: values.password,
											code: code
										})

										Swal.fire({
											title: 'Senha alterada',
											text: 'Sua senha foi alterada com sucesso.',
											icon: 'success',
											confirmButtonText: 'Voltar para o login'
										}).then(() => {
											setRedirect(true)
										})

									} catch (error) {
										Swal.fire({
											title: 'Não foi possível completar solicitação',
											text: 'O código expirou ou é inválido',
											icon: 'error',
											confirmButtonText: 'Voltar'
										}).then(() => {
											setStep(2)
										})
									}

									setSubmitting(false);
								}, 400);
							}}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
							}) => (
								<form id="forgotPasswordForm2" className="tooltip-end-bottom" onSubmit={handleSubmit}>
									<div className="mb-3 filled form-group tooltip-end-top">
										<input
											className='form-control'
											type="password"
											name="password"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password}
											placeholder='Informe uma nova senha'
										/>
										{errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
									</div>

									<div className="mb-3 filled form-group tooltip-end-top">
										<input
											className='form-control'
											type="password"
											name="password2"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password2}
											placeholder='Repetir senha'
										/>
										{errors.password2 && touched.password2 && <div className="d-block invalid-tooltip">{errors.password2}</div>}
									</div>
									<Button
										size="lg"
										type="submit"
										variant="success"
										disabled={isSubmitting}

									>
										{isSubmitting
											? <Spinner as="span" animation="border" size="sm" />
											: <>Alterar senha</>
										}
									</Button>
								</form>
							)}
						</Formik>
					</>
					: <></>
				}
			</div>
		</div>
	);

	return (
		<>
			{redirect ? <Redirect to='/' /> : null}

			<HtmlHead title={title} description={description} />
			<LayoutFullpage left={leftSide} right={rightSide} />
		</>
	);
};

export default ForgotPassword;
