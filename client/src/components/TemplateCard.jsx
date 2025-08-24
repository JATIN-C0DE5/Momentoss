function TemplateCard({ image, caption }) {
  return (
    <div className="template-card">
      <img src={image} alt={caption} />
      <p>{caption}</p>
    </div>
  );
}

export default TemplateCard;
