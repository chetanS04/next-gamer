import Navbar from "../../components/(frontend)/Navbar";


export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar></Navbar>
            {children}
        </>

    );
}
