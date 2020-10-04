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
import TextareaAutosize from 'react-autosize-textarea';
import { useUser } from '~/data/user';
import { usePostById } from '~/data/posts';
import { useCommentsByPost, useSendComment } from '~/data/comments';
import { usePostUserLike, useLikePost, useUnlikePost } from '~/data/likes';
import { UserFeedLayout } from '~/layouts/UserFeedLayout';
import {
  BaseContainer,
  UserLink,
  Comment,
  LikeIcon,
  Button,
  FollowButton,
  Slider,
} from '~/components';

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
  padding: ${({ loggedIn }) => (loggedIn ? '0' : '1rem')};
  display: flex;
  flex-direction: ${({ loggedIn }) => (loggedIn ? 'column' : 'row')};
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
`;

const Post = () => {
  const containerRef = useRef(null);
  const router = useRouter();
  const postId = useMemo(() => router && parseInt(router.query.post, 10), [router]);
  const { data: user, isLoading: userLoading } = useUser();
  const { data: post } = usePostById(postId);
  const { data: comments } = useCommentsByPost(postId);
  const { data: likes } = usePostUserLike(postId);
  const [newComment, setNewComment] = useState('');
  const loggedIn = useMemo(() => user != null, [user]);
  const liked = useMemo(() => likes != null && likes.length > 0, [likes]);

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
        <Slider images={post != null ? post.images : null} />
        <Info>
          <UserInfo>
            <UserLink username={router.query.user} />
            &nbsp;&nbsp;-&nbsp;&nbsp;
            <FollowButton />
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
          <BottomContainer loggedIn={loggedIn}>
            {loggedIn ? (
              <>
                <Actions>
                  <LikeButton onClick={onToggleLike}>
                    <LikeIcon
                      color={liked ? 'red' : 'default'}
                      filled={liked}
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
                  <Button
                    type="submit"
                    disabled={newComment.trim() === '' || sendingComment}
                  >
                    Enviar
                  </Button>
                </CommentBox>
              </>
            ) : null}
            {!loggedIn && !userLoading ? (
              <>
                <Link href="/login" passHref>
                  <Button as="a">
                    Login
                  </Button>
                </Link>
                &nbsp;to like or comment.
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
