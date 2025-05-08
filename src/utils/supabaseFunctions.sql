
-- SQL functions to use with Supabase to work around TypeScript issues

-- Function to get all merchandise
CREATE OR REPLACE FUNCTION get_all_merchandise()
RETURNS SETOF merchandise AS $$
BEGIN
  RETURN QUERY SELECT * FROM merchandise ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get merchandise by ID
CREATE OR REPLACE FUNCTION get_merchandise_by_id(item_id UUID)
RETURNS merchandise AS $$
BEGIN
  RETURN (SELECT * FROM merchandise WHERE id = item_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create merchandise
CREATE OR REPLACE FUNCTION create_merchandise(
  item_name TEXT,
  item_description TEXT,
  item_price NUMERIC,
  item_image TEXT,
  item_category TEXT,
  item_available_sizes TEXT[],
  item_in_stock BOOLEAN
)
RETURNS merchandise AS $$
DECLARE
  new_item merchandise;
BEGIN
  INSERT INTO merchandise (name, description, price, image, category, available_sizes, in_stock)
  VALUES (item_name, item_description, item_price, item_image, item_category, item_available_sizes, item_in_stock)
  RETURNING * INTO new_item;
  
  RETURN new_item;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update merchandise
CREATE OR REPLACE FUNCTION update_merchandise(
  item_id UUID,
  item_name TEXT DEFAULT NULL,
  item_description TEXT DEFAULT NULL,
  item_price NUMERIC DEFAULT NULL,
  item_image TEXT DEFAULT NULL,
  item_category TEXT DEFAULT NULL,
  item_available_sizes TEXT[] DEFAULT NULL,
  item_in_stock BOOLEAN DEFAULT NULL
)
RETURNS merchandise AS $$
DECLARE
  updated_item merchandise;
BEGIN
  UPDATE merchandise
  SET 
    name = COALESCE(item_name, name),
    description = COALESCE(item_description, description),
    price = COALESCE(item_price, price),
    image = COALESCE(item_image, image),
    category = COALESCE(item_category, category),
    available_sizes = COALESCE(item_available_sizes, available_sizes),
    in_stock = COALESCE(item_in_stock, in_stock),
    updated_at = NOW()
  WHERE id = item_id
  RETURNING * INTO updated_item;
  
  RETURN updated_item;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to delete merchandise
CREATE OR REPLACE FUNCTION delete_merchandise(item_id UUID)
RETURNS VOID AS $$
BEGIN
  DELETE FROM merchandise WHERE id = item_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if a user is an admin
CREATE OR REPLACE FUNCTION check_user_admin_status(user_id UUID)
RETURNS TABLE(is_admin BOOLEAN) AS $$
BEGIN
  RETURN QUERY 
  SELECT p.is_admin 
  FROM profiles p 
  WHERE p.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
