import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Post } from '../../../common/types';

const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const WriteButton = styled.button`
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.8rem;
  flex-wrap: wrap;
`;

const CatBtn = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  border: 1px solid ${props => props.$active ? '#ec4899' : 'var(--border-color)'};
  background: ${props => props.$active ? '#ec4899' : 'var(--card-bg)'};
  color: ${props => props.$active ? '#ffffff' : 'var(--text-secondary)'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ec4899;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const PostCard = styled.div`
  padding: 1.6rem;
  border-radius: 20px;
  cursor: pointer;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

const CategoryBadge = styled.span<{ $cat: string }>`
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  background: ${props =>
    props.$cat === 'review'
      ? 'rgba(236, 72, 153, 0.15)'
      : props.$cat === 'question'
      ? 'rgba(139, 92, 246, 0.15)'
      : 'rgba(16, 185, 129, 0.15)'};
  color: ${props =>
    props.$cat === 'review'
      ? '#ec4899'
      : props.$cat === 'question'
      ? '#8b5cf6'
      : '#10b981'};
`;

const PostMeta = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  display: flex;
  gap: 0.8rem;
`;

const PostTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: var(--text-primary);
`;

const PostSnippet = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 600;
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

// Modals
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 650px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 24px;
  padding: 2.2rem;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: rgba(148, 163, 184, 0.2);
  border: none;
  color: var(--text-primary);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.2rem;

  label {
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--text-primary);
  }

  input, select, textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-primary);
    font-size: 0.95rem;
    outline: none;

    &:focus {
      border-color: #ec4899;
    }
  }

  textarea {
    min-height: 140px;
    resize: vertical;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
`;

const LikeBtn = styled.button`
  background: rgba(236, 72, 153, 0.15);
  border: 1px solid #ec4899;
  color: #ec4899;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

const CommentSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
`;

const CommentItem = styled.div`
  padding: 0.8rem 0;
  border-bottom: 1px dashed var(--border-color);

  div.author {
    font-weight: 700;
    font-size: 0.85rem;
    color: #ec4899;
    margin-bottom: 0.2rem;
  }
  div.content {
    font-size: 0.95rem;
    color: var(--text-primary);
  }
  div.time {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-top: 0.3rem;
  }
`;

const FlowerCommunity: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  // New post state
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState<'review' | 'question' | 'tip'>('review');
  const [newContent, setNewContent] = useState('');

  // Comment state
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [categoryFilter]);

  const fetchPosts = async () => {
    try {
      const url = `http://localhost:5000/api/community?category=${categoryFilter}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) setPosts(json.data);
    } catch (e) {
      console.error('Failed to fetch community posts:', e);
    }
  };

  const handleOpenDetail = async (post: Post) => {
    setSelectedPost(post);
    try {
      const res = await fetch(`http://localhost:5000/api/community/${post.id}`);
      const json = await res.json();
      if (json.success) setSelectedPost(json.data);
    } catch (e) {
      console.error('Failed to view post detail:', e);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newContent) {
      alert('모든 입력란을 작성해 주세요!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          author: newAuthor,
          category: newCategory,
          content: newContent
        })
      });
      const json = await res.json();
      if (json.success) {
        alert('🎉 글이 성공적으로 등록되었습니다!');
        setIsWriteOpen(false);
        setNewTitle('');
        setNewAuthor('');
        setNewContent('');
        fetchPosts();
      }
    } catch (e) {
      console.error('Failed to create post:', e);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/community/${postId}/like`, { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        if (selectedPost) {
          setSelectedPost({ ...selectedPost, likes: json.likes });
        }
        fetchPosts();
      }
    } catch (e) {
      console.error('Failed to like post:', e);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentAuthor || !commentContent) return;

    try {
      const res = await fetch(`http://localhost:5000/api/community/${selectedPost.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: commentAuthor, content: commentContent })
      });
      const json = await res.json();
      if (json.success) {
        setSelectedPost({ ...selectedPost, comments: json.comments });
        setCommentContent('');
        fetchPosts();
      }
    } catch (e) {
      console.error('Failed to add comment:', e);
    }
  };

  const getCategoryLabel = (cat: string) => {
    if (cat === 'review') return '💐 선물 후기';
    if (cat === 'question') return '❓ 꽃 질문';
    if (cat === 'tip') return '🌱 집사 팁';
    return '전체';
  };

  return (
    <Container className="animate-fade-in">
      <TopBar>
        <Title>💬 감성 꽃 커뮤니티</Title>
        <WriteButton onClick={() => setIsWriteOpen(true)}>
          <span>✍️</span> 소소한 이야기 남기기
        </WriteButton>
      </TopBar>

      <CategoryTabs>
        <CatBtn $active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')}>
          🌿 전체글
        </CatBtn>
        <CatBtn $active={categoryFilter === 'review'} onClick={() => setCategoryFilter('review')}>
          💐 선물 후기
        </CatBtn>
        <CatBtn $active={categoryFilter === 'question'} onClick={() => setCategoryFilter('question')}>
          ❓ 꽃 선택 질문
        </CatBtn>
        <CatBtn $active={categoryFilter === 'tip'} onClick={() => setCategoryFilter('tip')}>
          🌱 식물 집사 팁
        </CatBtn>
      </CategoryTabs>

      <PostList>
        {posts.map(post => (
          <PostCard key={post.id} className="glass-card" onClick={() => handleOpenDetail(post)}>
            <PostHeader>
              <CategoryBadge $cat={post.category}>{getCategoryLabel(post.category)}</CategoryBadge>
              <PostMeta>
                <span>👤 {post.author}</span>
                <span>🕒 {post.createdAt}</span>
              </PostMeta>
            </PostHeader>
            <PostTitle>{post.title}</PostTitle>
            <PostSnippet>{post.content}</PostSnippet>

            <PostFooter>
              <StatItem>❤️ {post.likes}</StatItem>
              <StatItem>💬 {post.comments?.length || 0}</StatItem>
              <StatItem>👁️ {post.views}</StatItem>
            </PostFooter>
          </PostCard>
        ))}
      </PostList>

      {/* Create Post Modal */}
      {isWriteOpen && (
        <ModalOverlay onClick={() => setIsWriteOpen(false)}>
          <ModalContent className="glass-panel animate-fade-in" onClick={e => e.stopPropagation()}>
            <CloseBtn onClick={() => setIsWriteOpen(false)}>✕</CloseBtn>
            <h2 style={{ marginBottom: '1.2rem' }}>📝 새 이야기 작성</h2>
            <form onSubmit={handleCreatePost}>
              <FormGroup>
                <label>카테고리</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value as any)}>
                  <option value="review">💐 선물 후기</option>
                  <option value="question">❓ 꽃 선택 질문</option>
                  <option value="tip">🌱 식물 집사 팁</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>작성자 닉네임</label>
                <input
                  type="text"
                  placeholder="예: 꽃길만걷자"
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label>제목</label>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label>내용</label>
                <textarea
                  placeholder="꽃과 함께한 특별한 경험이나 질문을 남겨보세요..."
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                />
              </FormGroup>

              <SubmitBtn type="submit">등록하기</SubmitBtn>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <ModalOverlay onClick={() => setSelectedPost(null)}>
          <ModalContent className="glass-panel animate-fade-in" onClick={e => e.stopPropagation()}>
            <CloseBtn onClick={() => setSelectedPost(null)}>✕</CloseBtn>
            <CategoryBadge $cat={selectedPost.category} style={{ marginBottom: '0.8rem', display: 'inline-block' }}>
              {getCategoryLabel(selectedPost.category)}
            </CategoryBadge>
            <h2>{selectedPost.title}</h2>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.6rem 0 1.5rem' }}>
              작성자: <b>{selectedPost.author}</b> | {selectedPost.createdAt} | 조회수 {selectedPost.views}
            </div>

            <p style={{ lineHeight: 1.8, fontSize: '1rem', whiteSpace: 'pre-wrap', marginBottom: '2rem' }}>
              {selectedPost.content}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <LikeBtn onClick={() => handleLike(selectedPost.id)}>
                ❤️ 좋아요 {selectedPost.likes}
              </LikeBtn>
            </div>

            {/* Comment List */}
            <CommentSection>
              <h4 style={{ marginBottom: '1rem' }}>💬 댓글 ({selectedPost.comments?.length || 0})</h4>
              {selectedPost.comments?.map(comment => (
                <CommentItem key={comment.id}>
                  <div className="author">{comment.author}</div>
                  <div className="content">{comment.content}</div>
                  <div className="time">{comment.createdAt}</div>
                </CommentItem>
              ))}

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} style={{ marginTop: '1.5rem' }}>
                <FormGroup style={{ marginBottom: '0.6rem' }}>
                  <input
                    type="text"
                    placeholder="닉네임"
                    value={commentAuthor}
                    onChange={e => setCommentAuthor(e.target.value)}
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: '0.8rem' }}>
                  <input
                    type="text"
                    placeholder="댓글을 달아보세요..."
                    value={commentContent}
                    onChange={e => setCommentContent(e.target.value)}
                  />
                </FormGroup>
                <SubmitBtn type="submit" style={{ padding: '0.6rem', fontSize: '0.9rem' }}>
                  댓글 작성
                </SubmitBtn>
              </form>
            </CommentSection>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default FlowerCommunity;
