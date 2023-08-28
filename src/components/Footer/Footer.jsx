import './Footer.scss';

function Footer() {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <footer className="copyright">
      DevOfThrones, le blog du développeur React - {year} ©
    </footer>
  );
}

export default Footer;
