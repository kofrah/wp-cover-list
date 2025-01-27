// 検索結果が存在しない場合のコンポーネント
interface NoResultProps {
  query: string;
}

export const NoResult: React.FC<NoResultProps> = ({ query }) => {
  return (
    <div className="text-center pt-14">
      <p>"{query}"に一致する表紙はありませんでした。</p>
    </div>
  );
};
