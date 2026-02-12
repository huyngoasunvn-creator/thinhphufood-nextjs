interface AboutUsProps {
  config: any;
}

const AboutUs = ({ config }: AboutUsProps) => {
  if (!config) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{config.title}</h1>
      <div>{config.content}</div>
    </div>
  );
};

export default AboutUs;
