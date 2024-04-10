import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<h1>404</h1>
            <p>The GPS broke down and couldn't find the page you're looking for. Enter a new location to try again.</p>
        </div>
    );
}

export default PageNotFound;
