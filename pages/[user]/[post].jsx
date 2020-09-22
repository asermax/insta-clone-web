import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useOnClickOutside from 'use-onclickoutside';
import Link from 'next/link';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TextareaAutosize from 'react-autosize-textarea';
import { useUser } from '~/data/user';
import { usePostById } from '~/data/posts';
import { useCommentsByPost, useSendComment } from '~/data/comments';
import { usePostUserLike, useLikePost, useUnlikePost } from '~/data/likes';
import { UserFeedLayout } from '~/layouts/UserFeedLayout';
import { BaseContainer, UserLink, Comment } from '~/components';
import { LikeIcon } from '~/components/LikeIcon';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5rem;
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 200;
`;

const Container = styled(BaseContainer).attrs(() => ({
  as: 'article',
}))`
  flex: 1;
  height: 37.5rem;
  margin: auto auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background-color: white;
`;

const Images = styled.div`
  position: relative;
  width: 37.5rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &.right-enter {
      position: absolute;
      left: 37.5rem;
    }

    &.right-enter-active {
      left: 0;
      transition: left 300ms ease-out;
    }

    &.right-exit {
      position: absolute;
      left: 0;
    }

    &.right-exit-active {
      left: -37.5rem;
      transition: left 300ms ease-out;
    }

    &.left-enter {
      position: absolute;
      left: -37.5rem;
    }

    &.left-enter-active {
      left: 0;
      transition: left 300ms ease-out;
    }

    &.left-exit {
      position: absolute;
      left: 0;
    }

    &.left-exit-active {
      left: 37.5rem;
      transition: left 300ms ease-out;
    }
  }
`;

const SwitchImageButton = styled.button`
  position: absolute;
  top: calc(50% - 1rem);
  width: 2rem;
  height: 2rem;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.0625rem solid #dbdbdb;
  border-radius: 2rem;
  background-color: rgba(245, 245, 245, 0.8);
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 800;

  ${({ left }) => (left ? 'left: 1rem' : '')};
  ${({ right }) => (right ? 'right: 1rem' : '')};
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: 0.0625rem solid #dbdbdb;
`;

const UserInfo = styled.div`
  padding: 1rem;
  border-bottom: 0.0625rem solid #dbdbdb;
`;

const Comments = styled.div`
  flex: 1;
  overflow: auto;
  padding: 1rem;
  border-bottom: 0.0625rem solid #dbdbdb;
  scrollbar-width: none;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
  padding: 0.5rem 1rem;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const CommentBox = styled.form`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border-top: 0.0625rem solid #dbdbdb;

  textarea {
    flex: 1;
    margin-right: 0.5rem;
    resize: none;
    border: none;
    font-family: inherit;

    &::placeholder {
      color: #cbcbcb;
    }

    &:disabled {
      opacity: 0.3;
    }
  }

  button, a {
    border: none;
    background: none;
    cursor: pointer;
    color: #0095f6;
    font-weight: 700;
    text-decoration: none;

    &:disabled {
      opacity: 0.3;
    }
  }
`;

const Post = () => {
  const containerRef = useRef(null);
  const router = useRouter();
  const postId = useMemo(() => router && parseInt(router.query.post, 10), [router]);
  const { data: user, isLoading: userLoading } = useUser();
  const { data: post } = usePostById(postId);
  const { data: comments } = useCommentsByPost(postId);
  const { data: likes } = usePostUserLike(postId);
  const [currentImage, setCurrentImage] = useState(0);
  const [movementDirection, setMovementDirection] = useState(null);
  const [newComment, setNewComment] = useState('');

  const nextImage = useCallback(() => {
    setMovementDirection('right');
    setTimeout(() => setCurrentImage((current) => current + 1));
  }, [setMovementDirection, setCurrentImage]);

  const previousImage = useCallback(() => {
    setMovementDirection('left');
    setTimeout(() => setCurrentImage((current) => current - 1));
  }, [setMovementDirection, setCurrentImage]);

  const [sendComment, { isLoading: sendingComment }] = useSendComment();
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    sendComment({
      post: postId,
      comment: newComment,
    }, {
      onSuccess: () => setNewComment(''),
    });
  }, [newComment, postId, sendComment, setNewComment]);

  const [likePost] = useLikePost();
  const [unlikePost] = useUnlikePost();
  const onToggleLike = useCallback(() => {
    if (likes && likes.length) {
      unlikePost({ id: likes[0].id, post: postId, user: user.id });
    } else {
      likePost({ post: postId, user: user.id });
    }
  }, [postId, user, likes, likePost, unlikePost]);

  useOnClickOutside(containerRef, () => router.push(`/${router.query.user}`));

  return (
    <Backdrop>
      <Container ref={containerRef}>
        <Images>
          {currentImage > 0 ? (
            <SwitchImageButton
              onClick={previousImage}
              left
            >
              &lt;
            </SwitchImageButton>
          ) : null}
          {post != null ? (
            <TransitionGroup
              component={null}
            >
              <CSSTransition
                key={currentImage}
                classNames={movementDirection}
                timeout={300}
                mountOnEnter
                unmountOnExit
              >
                <img
                  src={post.images[currentImage].file}
                  alt={post.images[currentImage].description}
                />
              </CSSTransition>
            </TransitionGroup>
          ) : null}
          {post != null && currentImage < post.images.length - 1 ? (
            <SwitchImageButton
              onClick={nextImage}
              right
            >
              &gt;
            </SwitchImageButton>
          ) : null}
        </Images>
        <Info>
          <UserInfo>
            {post != null ? (
              <UserLink username={router.query.user} />
            ) : null}
          </UserInfo>
          <Comments>
            {post != null ? (
              <Comment
                user={router.query.user}
                comment={post.text}
                createDate={post.createDate}
              />
            ) : null}
            {comments != null ? comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            )) : null}
          </Comments>
          <BottomContainer>
            {user != null ? (
              <>
                <Actions>
                  <LikeButton onClick={onToggleLike}>
                    <LikeIcon
                      liked={likes != null && likes.length > 0}
                    />
                  </LikeButton>
                  <br />
                  {post && post.likesCount}
                  &nbsp;likes
                </Actions>
                <CommentBox onSubmit={onSubmit}>
                  <TextareaAutosize
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    placeholder="Escribí un comentario..."
                    maxRows={3}
                    disabled={sendingComment}
                  />
                  <button
                    type="submit"
                    disabled={newComment.trim() === '' || sendingComment}
                  >
                    Enviar
                  </button>
                </CommentBox>
              </>
            ) : null}
            {user == null && !userLoading ? (
              <>
                <Link href="/login">
                  Login
                </Link>
                &nbsp;to comment.
              </>
            ) : null}
          </BottomContainer>
        </Info>
      </Container>
    </Backdrop>
  );
};

Post.Layout = UserFeedLayout;

export default Post;
