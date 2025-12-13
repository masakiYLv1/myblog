import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { ArticleList } from "./features/articles/pages/ArticleList";

function App() {
  return (
    <>
      <Header />
      <ArticleList />
      <Footer />
    </>
  );
}

export default App;
