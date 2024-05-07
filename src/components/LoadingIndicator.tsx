function LoadingIndicator() {
  return (
    <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]">
      <div className="rounded-full h-14 w-14 bg-foreground animate-ping" />
    </div>
  );
}

export default LoadingIndicator;
