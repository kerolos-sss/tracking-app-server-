declare global {
    const MY_SECRET_KEY : string
}

((global || window ) as any).MY_SECRET_KEY = "MY_SECRET_KEY"

export default null