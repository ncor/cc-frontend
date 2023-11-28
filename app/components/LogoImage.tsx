import Image from "next/image";


/**
 * Takes full height, should be used in relative container.
 */
export default function LogoImage() {
    return (
        <Image
            alt=""
            src="../logo.svg"
            width={0}
            height={0}
            sizes="100vh"
            style={{ height: "100%", width: "auto" }}
        />
    );
}
