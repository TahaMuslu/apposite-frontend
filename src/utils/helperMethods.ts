

export const getCurrentPageTitle = (pathname: string) => {
    const path = pathname.split("/").filter((p) => p !== "");
    if (path.length === 0) return "Home";
    return path[0];
    };