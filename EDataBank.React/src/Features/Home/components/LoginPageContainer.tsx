import React from 'react';

import '../style/loginpagecontainer.css';

const LoginPageContainer = (props: { children: React.ReactNode }) => {
	return (
		<div className="main-container">
			<div className="quad-green-bg" />
			<div className="login-wrapper">
				<div className="ms-Grid" dir="ltr">
					<div className="ms-Grid-row form-container">{props.children}</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPageContainer;
