const GoogleIcon = () => (
    <svg
        className="w-5 h-5"
        viewBox="0 0 533.5 544.3"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path fill="#4285F4" d="M533.5 278.4c0-17.6-1.6-34.7-4.7-51.1H272v96.8h146.9c-6.4 34.5-25.4 63.8-54 83.2v68h87.3c51-47 81.3-116.2 81.3-196.9z" />
        <path fill="#34A853" d="M272 544.3c73.5 0 135.1-24.4 180.1-66.2l-87.3-68c-24.2 16.2-55.1 25.8-92.8 25.8-71.4 0-132-48.1-153.6-112.6H27.9v70.6c44.5 87.9 135.4 150.4 244.1 150.4z" />
        <path fill="#FBBC05" d="M118.4 323.3c-10.1-30.3-10.1-62.8 0-93.1V159.6H27.9c-29.7 58.4-29.7 127.4 0 185.7l90.5-70z" />
        <path fill="#EA4335" d="M272 107.4c39.9-.6 78.2 14 107.4 41.1l80.4-80.4C404.4 24.4 343 0 272 0 163.3 0 72.4 62.5 27.9 150.4l90.5 70C139.9 155.5 200.5 107.4 272 107.4z" />
    </svg>
)

const GoogleSignInButton = () => (
    <button
        type="button"
        className="w-full flex items-center justify-center gap-2"
    >
        <GoogleIcon />
        Sign in with Google
    </button>
)

export default GoogleSignInButton
