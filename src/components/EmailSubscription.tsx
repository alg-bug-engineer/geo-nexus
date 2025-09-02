// src/components/EmailSubscription.tsx
export const EmailSubscription = () => {
  return (
    <section className="py-20">
      {/* CHANGE 1: The container is now wider.
        We removed the 'container' class and are using 'w-4/5' (which is 80%)
        to explicitly control the width. 'mx-auto' keeps it centered.
      */}
      <div className="w-4/5 mx-auto px-4">
        <div 
          className="mx-auto text-center bg-gradient-to-br from-secondary to-primary p-8 md:p-12 rounded-2xl border border-accent/30 shadow-2xl shadow-accent/10"
        >
          <h2 className="text-4xl font-bold text-text-main mb-4">
            不错过任何一个GEO趋势
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
            订阅我们的资讯，免费获取《GEO入门权威白皮书》，并定期收到最新行业动态。
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="请输入您的邮箱"
              required
              className="w-full flex-grow bg-primary/80 border border-secondary text-text-main rounded-full py-3 px-5 focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-300 placeholder:text-text-secondary"
            />
            <button
              type="submit"
              // CHANGE 2: Added 'whitespace-nowrap' to prevent text wrapping.
              // Increased padding 'px-8' to make the button physically larger.
              className="bg-accent text-primary font-bold py-3 px-8 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 whitespace-nowrap"
            >
              立即订阅
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
