import Layout from '../components/layout';
import { useUser } from '../lib/hooks';

const Home = () => {
  const user = useUser();

  return (
    <Layout>
      <h2>Home</h2>
      {user ? (
        <>
          <h2>Profile</h2>
          <pre style={{ overflow: 'auto' }}>{JSON.stringify(user, null, 2)}</pre>
        </>
      ) : (
        <div>Log in to continue</div>
      )}
      <style jsx>{``}</style>
    </Layout>
  );
};

export default Home;
