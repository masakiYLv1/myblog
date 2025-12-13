import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { ArticleListPage } from "./features/articles/pages/ArticleListPage";

function App() {
  return (
    <>
      <Header />
      <ArticleListPage />
      <Footer />
    </>
  );
}

export default App;
