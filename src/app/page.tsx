import CollapseContainer from '@/components/common/collapse-container';
import packageJson from '../../package.json';

export default function Home() {

  const version = packageJson.version;

  return (

    <div className="container mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">Welcome to the Open Work Permit Application Monitor</h1>
      <p className="mb-4">
        I created this application out of boredom because I sat and waited for my decision. Why not make the waiting game a bit more fun and organized?
      </p>
      <p className="mb-4">
        This website is designed to help you monitor your open work permit applications. Our goal is to provide a simple and effective way for you to track the status and progress of your applications without requiring any personal information.
      </p>

      <CollapseContainer text='How It Works'>
        <p className="mb-4">
          You can log in with a made-up username and a simple password. Just make sure to remember these credentials, as you will need them to update your applications and their statuses. We do not store any personal information, so your privacy is guaranteed.
        </p>
        <p className="mb-4">
          To get started, simply sign up with a username and password. Once logged in, you can start adding your applications and tracking their statuses. Enjoy the convenience of having all your application information in one place!
        </p>
        <p className="mb-4">
          <strong>Note:</strong> Remember your login credentials, as we do not have a password recovery system in place.
        </p>
      </CollapseContainer>

      <CollapseContainer text='Features'>
        <ul className="list-disc list-inside mb-4">
          <li>Add as many applications as you want.</li>
          <li>Edit and delete your applications at any time.</li>
          <li>Filter and sort your applications to understand where you stand compared to others.</li>
          <li>Download your entire application data at any time, ensuring you have up-to-date records.</li>
          <li>Share links to your applications for better monitoring and collaboration.</li>
        </ul>
      </CollapseContainer>

      <CollapseContainer text='Purpose' subText='( disclaimers )'>
        <p className="mb-4">
          This site is not for commercial use. It is designed purely for monitoring and statistical purposes. By using this site, you can gain insights into the application process and better manage your expectations.
        </p>
        <p className="mb-4">
          <strong>Disclaimer:</strong> This application is provided -as is- without any representations or warranties, express or implied. The creator of this application will not be held liable for any damages arising from the use of this application. Users are responsible for the accuracy of the data they input and for complying with any relevant legal requirements. This site is intended for personal use only, and any misuse of the site or its data is strictly prohibited.
        </p>
      </CollapseContainer>

      <CollapseContainer text='About me' subText='( like anyone cares lol )'>
          <p>Made by Vladimir Yel</p>
          <p>Email: <a href="mailto:yvova88@yahoo.com">yvova88@yahoo.com</a></p>
      </CollapseContainer>
      
      <CollapseContainer text='Updates'>
        <p>Version {version}</p>
        <ul className="list-disc list-inside mb-4">
          <li>Added date validation.</li>
          <li>Implemented versioning.</li>
          <li>Calculated average statistics for pending and approved applications.</li>
          <li>Fixed date validation and submission bugs.</li>
          <li>Added hints to sign-up and sign-in forms.</li>
        </ul>
      </CollapseContainer>
    </div>
  );
}
