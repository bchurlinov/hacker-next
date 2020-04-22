import axios from "axios";
import Error from "next/error";
import StoryList from "../components/StoryList";
import Layout from "../components/Layout";
import Link from "next/link";

class Index extends React.Component {

    static getInitialProps = async (context) => {

        let stories;
        let page;

        try {

            page = Number(context.query.page) || 1;
            stories = await axios.get(`https://node-hnapi.herokuapp.com/news?page=${page}`);

        } catch (err) {
            stories = [];
        }

        return {
            stories: stories.data,
            page
        }
    }

    render() {

        const { stories, page } = this.props;

        if (stories.length !== 0) {
            return (
                <Layout title="Hacker Next" description="A really nice Next.js description">
                    <div>
                        <StoryList stories={stories} />
                    </div>

                    <footer>
                        <Link href={`/?page=${page + 1}`}>
                            <a>Next Page ({page + 1})</a>
                        </Link>
                    </footer>

                    <style jsx>{`
                        footer {
                            padding: 1em;
                        }

                        footer a {
                            font-weight: bold;
                            color: black;
                            text-decoration: none;
                        }
                    `}</style>
                </Layout>
            )
        } else {
            <Error statusCode={503} />
        }
    }
}

export default Index;