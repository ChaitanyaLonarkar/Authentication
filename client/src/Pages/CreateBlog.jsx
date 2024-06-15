import React from "react";
import person from "../assets/ppp.jpg";
import { FcLike } from "react-icons/fc";
import { GoHeartFill } from "react-icons/go";
import { FaRegCommentDots } from "react-icons/fa";
import { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { FaShare } from "react-icons/fa";
export default function CreateBlog() {
  const [isLiked, setisLiked] = useState(false);
  return (
    <>
      <div className="flex justify-center my-4  items-center ">
        <div className="md:w-[50rem] max-[400px]:w-[19rem]  bg-white p-3 min-[401px]:p-7 md:p-12 flex flex-col gap-10 rounded-lg">
          <div className="b-heading  max-[400px]:text-2xl min-[401px]:text-3xl md:text-5xl font-extrabold text-indigo-900  leading-tight  ">
            Overcoming Challenges and Finding a Great Job in a Competitive
            Landscape
          </div>

          <div className="flex gap-5 text-sm  font-medium text-indigo-900">
            <div className=" bg-slate-200 p-1 px-3 rounded-2xl "> Career</div>
            <div className=" bg-slate-200 p-1 px-3 rounded-2xl "> Job</div>
            <div className=" bg-slate-200 p-1 px-3 rounded-2xl "> Tech</div>
          </div>
          <div className="blogger-details flex gap-3 items-center justify-between text-slate-700 border-t-2  border-b-2 p-4">
            <div className="flex gap-3 items-center">
              <div className="w-16 ">
                <img src={person} alt="" />
              </div>
              <div>
                Chaitanya Lonarkar
                <br />
                <span className="text-sm text-slate-500">17 hours ago</span>
              </div>
            </div>
            <div className="flex gap-8">
            {isLiked ? (
              <FcLike
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setisLiked(false);
                }}
              />
            ) : (
              <FcLikePlaceholder
                className="text-2xl  cursor-pointer hover:text-slate-600"
                onClick={() => {
                  setisLiked(true);
                }}
              />
              // <GoHeartFill  />
            )}
            <FaRegCommentDots className="text-2xl text-slate-400 hover:text-slate-600 cursor-pointer" />
            <FaShare className="text-2xl text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
          </div>

          <div className="blog-content flex flex-col gap-10">
            <div>
              <img
                src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*CC1ML6NyDUAWSLdRJLFsMg.jpeg"
                alt=""
              />
            </div>
            <div className="text-justify  ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id,
              atque eveniet debitis assumenda expedita cumque aliquid, repellat
              ab magni obcaecati suscipit minus molestias sint incidunt
              reprehenderit iusto. Ullam ea quisquam beatae aut quibusdam nisi
              quod aliquid pariatur in assumenda, ut dolore sed animi laboriosam
              magni doloribus asperiores. Quisquam voluptate sapiente quibusdam
              earum itaque amet. Reiciendis, ipsa! Accusamus sed beatae alias
              hic quas excepturi praesentium debitis aliquid id exercitationem
              reprehenderit laudantium illum blanditiis dolorum fuga unde, iusto
              at dicta consequatur eaque voluptatum quia inventore dolor. Sunt
              corporis similique maiores veritatis nulla quis voluptate ut!
              Debitis ad, fugiat voluptates optio, pariatur ipsa, dolore quidem
              error laboriosam dolores delectus natus minus. Molestias
              laudantium, eaque officiis aperiam consequatur quaerat eligendi
              mollitia cumque illo fuga ut! Possimus adipisci molestiae dolor at
              nihil quaerat praesentium porro tenetur. Reprehenderit possimus
              vero quis iste quisquam molestias veritatis quam ullam quod!
              Dolorem ea aut sed placeat quas laborum, totam vel doloribus
              corporis magnam aspernatur perferendis ratione quae fugiat iusto
              exercitationem! Harum est incidunt, autem quia veniam eaque optio
              delectus nisi. Ratione nesciunt accusamus beatae, odio veniam
              molestiae aspernatur a fugiat sint non laudantium recusandae
              corrupti harum sequi, eius commodi. Molestias vel beatae labore
              obcaecati ut repellat esse earum laborum eaque blanditiis
              perspiciatis nesciunt aliquam distinctio nulla commodi, fugit
              dignissimos quis sunt architecto consequuntur. Natus deleniti quo
              veritatis perspiciatis harum rerum minima fugiat omnis tempora ab!
              Rerum beatae dolores, ipsum similique fugit, laboriosam fuga saepe
              optio explicabo modi qui placeat earum numquam voluptas voluptatem
              accusamus. Delectus facilis itaque deserunt, non earum cum in
              distinctio atque molestiae nam magnam harum eligendi dolorem
              adipisci suscipit repellendus fugit rem accusamus veniam ad
              excepturi pariatur. <br /> <br />
              Tenetur harum ex quae provident tempore, officiis, mollitia
              reiciendis illo cum laborum libero temporibus animi, optio velit
              molestiae? Dicta autem at labore natus ab ipsam animi unde, neque
              numquam. Reprehenderit voluptatibus dolorum, modi iste dolore iure
              aut maxime? Ipsa fugit non sunt dolorem optio sequi tenetur
              veritatis a, accusamus asperiores obcaecati, ea, mollitia itaque
              corrupti atque unde! Recusandae, natus. Facilis alias quos ipsam
              voluptates, similique explicabo nulla est provident ea eos cumque,
              accusamus eius esse nam deserunt unde, id molestiae repellat quod
              quidem deleniti eum aliquam cupiditate sapiente! Iure voluptatum
              eligendi itaque laboriosam delectus! Vero porro itaque, beatae
              voluptatem minima id aliquid doloribus quidem veniam officiis odit
              rerum voluptates accusantium officia aliquam sed corporis quis,
              obcaecati labore harum? Eaque autem dolorum odit dolores ad
              blanditiis hic incidunt dignissimos, amet doloremque atque
              voluptates ullam adipisci maxime molestiae officia, nihil id sequi
              inventore repellat deleniti.
              <br />
              <br />
              Harum nesciunt explicabo maiores recusandae porro quibusdam
              necessitatibus dolorem illum repudiandae, beatae qui itaque
              perferendis suscipit quis, deleniti non commodi tempore iusto sit
              iure accusamus? Dolore eaque alias animi dolorum praesentium eum
              ut neque optio rerum possimus ea nostrum voluptatibus velit
              provident numquam libero labore, in illum perferendis ratione
              laborum blanditiis maxime? Amet, ipsum ipsa natus cum consectetur
              sapiente iusto, enim accusamus harum minima iste autem
              voluptatibus perspiciatis quo laudantium similique voluptatum?
              Corporis rem pariatur quidem adipisci veritatis iure? Voluptates
              est nisi, exercitationem distinctio dolor totam?
            </div>
          </div>
          <div className="flex gap-8">
            {isLiked ? (
              <FcLike
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setisLiked(false);
                }}
              />
            ) : (
              <FcLikePlaceholder
                className="text-2xl  cursor-pointer hover:text-slate-600"
                onClick={() => {
                  setisLiked(true);
                }}
              />
              // <GoHeartFill  />
            )}
            <FaRegCommentDots className="text-2xl text-slate-400 hover:text-slate-600 cursor-pointer" />
            <FaShare className="text-2xl text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}
