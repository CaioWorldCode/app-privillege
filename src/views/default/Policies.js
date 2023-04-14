import React, { useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'


import LayoutFullpage from 'layout/LayoutFullpage'
import HtmlHead from 'components/html-head/HtmlHead'



const Policies = () => {

	const title = 'Login';
	const description = 'Login Page';

	const [redirect, setRedirect] = useState(false)




	const leftSide = (
		<div className="min-h-100 d-flex align-items-center">
			<div className="w-100 w-lg-75 w-xxl-50">
				{/* <div>
				</div> */}
			</div>
		</div>
	)

	const rightSide = (
		<div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
			<div className="sw-lg-50 px-5">
				<div className="sh-11">
					<NavLink to="/">
						<div className="logo-default" />
					</NavLink>
				</div>
				<div className="mb-5">
					<h2 className="cta-1 mb-0 text-primary">Políticas de uso e privacidade dos dados</h2>


					<h4 className="cta-4 mt-2 mb-0 text-primary">Coleta de informações pessoais:</h4>

					<p className="mb-2 text-white">
						Nós coletamos informações pessoais, como nome, endereço de e-mail e informações de pagamento, quando você se inscreve em nosso portal de assinaturas. Essas informações são usadas apenas para fornecer os serviços solicitados e não são compartilhadas com terceiros, exceto quando necessário para cumprir com a lei.
					</p>


					<h4 className="cta-4 mt-2 mb-0 text-primary">Uso das informações:</h4>

					<p className="mb-2 text-white">
						Usamos suas informações pessoais para gerenciar sua assinatura e fornecer informações relevantes sobre o serviço. Podemos usar suas informações para enviar atualizações de produto, promoções ou outras informações relacionadas à sua assinatura. Você pode optar por não receber essas informações a qualquer momento.
					</p>

					<h4 className="cta-4 mt-2 mb-0 text-primary">Segurança das informações:</h4>

					<p className="mb-2 text-white">
						Implementamos medidas de segurança razoáveis para proteger suas informações pessoais contra acesso, uso, alteração ou divulgação não autorizados. No entanto, não podemos garantir a segurança completa das informações durante a transmissão ou armazenamento.
					</p>

					<h4 className="cta-4 mt-2 mb-0 text-primary">Uso de cookies:</h4>

					<p className="mb-2 text-white">
						Utilizamos cookies para melhorar a experiência do usuário em nosso portal. Os cookies são pequenos arquivos de dados que são armazenados em seu computador ou dispositivo móvel. Eles nos ajudam a lembrar suas preferências e histórico de navegação, tornando a utilização do portal mais eficiente.
					</p>

					<h4 className="cta-4 mt-2 mb-0 text-primary">Direitos do usuário:</h4>

					<p className="mb-2 text-white">
						Você tem o direito de solicitar o acesso, correção ou exclusão de suas informações pessoais que temos em nosso sistema. Para exercer esses direitos, entre em contato conosco através do portal.
					</p>


					<h4 className="cta-4 mt-2 mb-0 text-primary">Alterações na política:</h4>
					<p className="mb-2 text-white">
						Podemos atualizar esta política de privacidade periodicamente. A versão mais recente estará sempre disponível em nosso portal de assinaturas. A continuação do uso do portal após as alterações constituirá sua aceitação das mesmas.
					</p>

					<h4 className="cta-4 mt-2 mb-0 text-primary">Contato:</h4>
					<p className="mb-2 text-white">
						Se você tiver dúvidas ou preocupações sobre esta política de privacidade, entre em contato conosco através do portal de assinaturas.
					</p>




				</div>
			</div>
		</div>
	)



	return (
		<>
			{redirect ? <Redirect to='/' /> : null}

			<HtmlHead title={title} description={description} />
			<LayoutFullpage left={leftSide} right={rightSide} />
		</>
	);
};

export default Policies;
